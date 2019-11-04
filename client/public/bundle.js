
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var mathHelpers = createCommonjsModule(function (module) {
    const getRandomInteger = ( limit ) => {
        return Math.floor( Math.random() * Math.floor( limit ) )
    };

    const getRandomGender = () => {
        const randomNum = module.exports.getRandomInteger(3); 
        if ( randomNum === 0 ) {
            return 'None of your business'
        }
        if ( randomNum === 1 ) {
            return 'M'
        }
        
        else {
            return 'F'            
        }

    };

    module.exports = {
        getRandomInteger,
        getRandomGender
    };
    });
    var mathHelpers_1 = mathHelpers.getRandomInteger;
    var mathHelpers_2 = mathHelpers.getRandomGender;

    const getRandomName = () => {

        const letterCollection = [
            [
                'a', 'e', 'i', 'o', 'u', 'y'
            ],
            [
                'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k',
                'l', 'm', 'n', 'p', 'q', 'r', 's', 't',
                'v', 'w', 'x', 'z'
            ]
        ];

        const letterCounter = {
            vowels : 0,
            consonants: 0,
            oddConsonants: false
        };

        let nameLength = mathHelpers.getRandomInteger(12);

        nameLength = checkNameLength ( nameLength );

        var name = '';

        for ( var i = 0; i < nameLength; i++ ) {
            name += getLetter( i, letterCollection, letterCounter );   
        }

        return name.charAt(0).toUpperCase() + name.slice(1);

    };

    // Retrieve letter from collection. Change letterCounter accordingly
    const getLetter = ( i, letterCollection, letterCounter ) => {
        let letterArray;

        if ( i !== 0) {
            const letterType = getLetterType( letterCounter );
            letterArray = getLetterTypeFromCollection( letterCollection, letterType );
        }

        else {
            letterArray = getLetterTypeFromCollection( letterCollection );
        }

        const letter = getRandomEntryFromArray( letterArray );

        if (letter === 'j' || letter === 'x' || letter === 'q' ) {
            letterCounter.oddConsonants = true;
        }

        ( letterArray == letterCollection[0] ) 
            ? letterCounter.vowels += 1 
            : letterCounter.consonants += 1; 

        return letter
    };

    // check if name has a somewhat normal length
    const checkNameLength = ( nameLength ) => {
        if ( nameLength < 1 ) {
            return nameLength += 3
        }
        if ( nameLength < 3 ) {
            return nameLength += 2
        }
        return nameLength
    };

    const getLetterTypeFromCollection = ( collection, type ) => {
        let letterType = type || null;

        if ( letterType !== null ) {
            (letterType == 'V' ) ? letterType = 0 : letterType = 1;
        }
        else {
            letterType = mathHelpers.getRandomInteger(2);
        }

        return collection[letterType]
    };

    const getRandomEntryFromArray = function  ( array ) {
        return array[ mathHelpers.getRandomInteger( array.length ) ]
    };

    // small 'algorithm' to somewhat mirror the structure of a normal English word
    const getLetterType = ( letterCounter ) => {

        if ( letterCounter.oddConsonants !== true ) {
            if ( letterCounter.vowels <= 1 && letterCounter.consonants <= 1 ) {
                return ( mathHelpers.getRandomInteger(2) == 1 ) ? 'V' : 'C'
            }

            if ( letterCounter.vowels === 2 ) {
                letterCounter.vowels = 0;
                return 'C'
            }

            if ( letterCounter.consonants === 2 ) {
                if ( mathHelpers.getRandomInteger(10) == 9 ) {
                    return 'C'
                }
                letterCounter.consonants = 0;
                return 'V'
            }

            if ( letterCounter.consonants === 3 ) {
                letterCounter.consonants = 0;
                return 'V'
            }

            return mathHelpers.getRandomInteger(2)
        }

        else {
            letterCounter.consonants = 0;
            letterCounter.oddConsonants = false;
            return 'V'
        }
    };


    var randomNameGen = {
        getRandomName
    };

    class characterBlueprint {
        constructor(name, gender) {
            this.name = name || randomNameGen.getRandomName(),
            this.gender = gender || mathHelpers.getRandomGender(),
            this.level = 1,
            this.experience = 0;

            // the methods below will become the primary handlers of stats changes
            // battle moves will not directly access the other character's stats
            // they will call one of the methods below

            this.receiveDamage = (damage) => {
                damage -= this.stats.Defense;
                damage = damage < 0 ? 0 : damage;
                this.stats.Health -= damage;
            };

            this.receiveManaDamage = (damage) => {
                damage -= this.stats.Defense;
                damage = damage < 0 ? 0 : damage;
                this.stats.Mana -= damage;
            };
        
            this.changeStats = (stat, num) => {
        
            };
        
            this.changeSkills = () => {
                
            };
        
            this.changeTraits = () => {
                
            };
        
        }
    }

    const getBaseTraits = ( gender )=>  {
        const charGender = gender || 0;

        const baseTraits = {
            STR : 5,
            END : 5,
            INT : 5,
            AGI : 5,
            CHA : 5,
            FIN : 5,
        };

        if ( charGender === 'Female' ) {
            return baseTraits
        }

        if ( charGender === 'Male' ) {
            return baseTraits
        }

        return baseTraits
    };

    var characterBlueprint_1 = {
        characterBlueprint,
        getBaseTraits
    };

    var initSkills_1 = {
        calcSkills : (traits) => {
            let baseSkills = initSkills(traits);
            return initCombinedSkills(baseSkills)
        }
    };

    // this is just some dummy stuff for now
    // skills are assigned to character instances, but they don't do anything yet

    const initSkills = (traits) => {
        return {
            //Strength skills
            Muscle : {
                skillLevel: traits.STR,
                skillXP: 0,
                skillDesc: "Muscle determines the weight you can carry. Important for Heavy Weapons."
            },
            Fitness : {
                skillLevel: traits.STR,
                skillXP: 0,
                skillDesc: "Fitness determines how long you can run. Also imporant for Attractiveness and Acrobatics."
            },

            //Endurance skills
            Willpower : {
                skillLevel: traits.END,
                skillXP: 0,
                skillDesc: "Willpower influences your Learning skill and the amount of mana your spells cost."
            },
            Perseverance : {
                skillLevel: traits.END,
                skillXP: 0,
                skillDesc: "Perseverance influences your Heavy Weapons skills and reduces the amount of damage you take."
            },
            
            //Intelligence skills
            Perception : {
                skillLevel: traits.INT,
                skillXP: 0,
                skillDesc: "Perception allows you to see your enemies weakness. It's also important for Learning and Light Weapons."
            },
            Wisdom : {
                skillLevel: traits.INT,
                skillXP: 0,
                skillDesc: "Wisdom influences your Trustworthyness. It also determines which spells you can use."
            },

            //Agility skills
            Athletics : {
                skillLevel: traits.AGI,
                skillXP: 0,
                skillDesc: "Determines your running speed. Also influences Light Weapons and Acrobatics."
            },
            Sneak : {
                skillLevel: traits.AGI,
                skillXP: 0,
                skillDesc: "Determines succes at sneaking and stealing. Also influences your Dodge skills."
            },

            //Charisma skills
            Speech : {
                skillLevel: traits.CHA,
                skillXP: 0,
                skillDesc: "Important for getting information out of people. Has influence on your Trustworthyness and Attractiveness."
            },
            Beauty : {
                skillLevel: traits.CHA,
                skillXP: 0,
                skillDesc: "Can be used to distract or beguile NPC's and enemies. Strongly influences your Attractiveness."
            },

            //Finance skills
            Bartering : {
                skillLevel: traits.FIN,
                skillXP: 0,
                skillDesc: "A high bartering skill can considerably decrease the prices you have to pay for items and assets."
            },
            Credit_Rating : {
                skillLevel: traits.FIN,
                skillXP: 0,
                skillDesc: "Influences trustworthyness. Determines the amount of money you can loan and the amount of interest you pay."
            }

        }

    };

    const initCombinedSkills = (skills) => {
        //Combined skills
        skills.Trustworthyness = {
            skillLevel: calcTrustworthyness(skills),
            skillXP: 0,
            skillDesc: "Trustworthyness is especially important to Finance and Charisma oriented characters. Influences your reputation with parents and CEO's."
        },
        skills.Attractiveness = {
            skillLevel: calcAttractiveness(skills),
            skillXP: 0,
            skillDesc: "Of high importance to Charisma oriented characters, Attractiveness gives you a wide range of small advantages in the game."
        },
        skills.Acrobatics = {
            skillLevel: calcAcrobatics(skills),
            skillXP: 0,
            skillDesc: "Determines your jumping height and flexibility."
        },
        skills.Learning = {
            skillLevel: calcLearning(skills),
            skillXP: 0,
            skillDesc: "Influences the speed at which you master new spells, weapons and professions."
        },
        skills.Light_Weapons = {
            skillLevel: calcLightWeapons(skills),
            skillXP: 0,
            skillDesc: "Influences your light weapon damage and proficiency."
        },
        skills.Heavy_Weapons = {
            skillLevel: calcHeavyWeapons(skills),
            skillXP: 0,
            skillDesc: "Influences your heavy weapon damage and proficiency."
        },
        skills.Dodge = {
            skillLevel: calcDodge(skills),
            skillXP: 0,
            skillDesc: "Determines you chances at evading enemy attacks"
        };

        return skills
    };

    const calcTrustworthyness = (skills) => {
        return Math.round(( skills.Credit_Rating.skillLevel + skills.Speech.skillLevel + skills.Wisdom.skillLevel ) / 3)
    };

    const calcAttractiveness = (skills) => {
        return Math.round(( skills.Speech.skillLevel + (skills.Beauty.skillLevel * 2) + skills.Fitness.skillLevel ) / 4)
    };

    const calcAcrobatics = (skills) => {
        return Math.round(( skills.Fitness.skillLevel + skills.Athletics.skillLevel ) / 2)
    };

    const calcLearning = (skills) => {
        return Math.round(( skills.Willpower.skillLevel + skills.Perception.skillLevel ) / 2)
    };

    const calcLightWeapons = (skills) => {
        return Math.round(( skills.Athletics.skillLevel + skills.Perception.skillLevel ) / 2)
    };

    const calcHeavyWeapons = (skills) => {
        return Math.round(( skills.Muscle.skillLevel + skills.Perseverance.skillLevel ) / 2)
    };

    const calcDodge = (skills) => {
        return Math.round(( skills.Perception.skillLevel + skills.Sneak.skillLevel ) / 2)
    };

    // Initialize stats based on character traits

    const calcStats = (traits) => {
        return {
            Health: getHealth(traits.END),
            Mana: getMana(traits.INT),
            Attack: getAttack(traits.STR, traits.AGI),
            Defense: getDefense(traits.STR, traits.END),
            Sp_Attack: getSpAttack(traits.INT, traits.AGI),
            Sp_Defense: getSpDefense(traits.INT, traits.END),
            Attack_Speed: traits.AGI,
            Experience: 0
        }
    };

    const getHealth = (endurance) => {
        return Math.round(endurance * 5)
    };

    const getMana = (intelligence) => {
        return Math.round(intelligence * 5)
    };

    const getAttack = (strength, agility) => {
        return Math.round((strength + agility) / 2)
    };

    const getDefense = (strength, endurance) => {
        return Math.round((strength + endurance) / 2)
    };

    const getSpAttack = (intelligence, agility) => {
        return Math.round((intelligence + agility) / 2)
    };

    const getSpDefense = (intelligence, endurance) => {
        return Math.round((intelligence + endurance) / 2)
    };

    var initStats = {
        calcStats
    };

    const initMoves = ( classFocus ) => {

        // this is just some practice stuff for now, but it does work 
        // If you create two character instances, they can attack eachother
        // Nothing happens if a character's health reaches zero though...

        if ( classFocus = [ "STR", "CHA" ] ) {
            return {
                attack : (attacker, defender) => {
                    const damage = attacker.traits.STR;
                    defender.receiveDamage(damage);
                },
                sing : (attacker, defender) => {
                    const damage = attacker.traits.INT;
                    defender.receiveDamage(damage);
                }            
            }                
        }

        if ( classFocus = [ "INT" ] ) {
            return {
                correctGrammar : (attacker, defender) => {
                    const damage = attacker.traits.STR;
                    defender.receiveDamage(damage);
                },
                sing : (attacker, defender) => {
                    const damage = attacker.traits.INT;
                    defender.receiveDamage(damage);
                }            
            }                
        }

    };

    var initMoves_1 = {
        initMoves
    };

    // all classes are stored in the initClasses object, which is exported
    // class constructors can be accessed directly from this object


    const initClasses = {
        Influencer : class extends characterBlueprint_1.characterBlueprint {
            constructor (name, gender) {
                super(name, gender),

                this.className    = "Influencer",

                this.classFocus   = [ "STR", "CHA" ],

                this.description  = "Attractive but unintelligent, the influencer relies on their Fitness and Beauty. Well suited for a light weapons and high Charisma build.",

                this.uniqueAttack = {
                    'Break the internet' : { 
                        description: 'Distracts the opponent based on the Influencers Attractiveness. More effective against characters who have low Beauty, Fitness and Speech skills.' 
                    }
                },

                this.traits         = this.initTraits( this.gender ),

                this.skills         = initSkills_1.calcSkills(this.traits),
                
                this.stats          = initStats.calcStats(this.traits),
                
                this.moves          = initMoves_1.initMoves(this.classFocus);
            }

            initTraits( gender ) {
                let baseTraits = characterBlueprint_1.getBaseTraits( gender );
                return {
                    STR : baseTraits.STR + 2,
                    END : baseTraits.END - 1,
                    INT : baseTraits.INT - 2,
                    AGI : baseTraits.AGI,
                    CHA : baseTraits.CHA + 2,
                    FIN : baseTraits.FIN - 1
                }
            }
        },

        Athlete : class extends characterBlueprint_1.characterBlueprint {
            constructor (name, gender) {
                super(name, gender),

                this.className     = "Athlete",

                this.classFocus   = [ "STR", "AGI" ],

                this.description   = "The athlete is a class based on physical traits: Strength, Agility and Endurance. The exclusive focus on sports in their education means a severe lack in other traits, especially Finance and Intelligence",

                this.uniqueAttack  = {
                    'Push it to the limit!' : { 
                        description: 'Temporarily gives a strong buff to Strength and Agility. Afterwards, the Endurance of the Athlete is severly debuffed.'
                    }
                },

                this.traits         = this.initTraits( this.gender ),

                this.skills         = initSkills_1.calcSkills(this.traits),
                
                this.stats          = initStats.calcStats(this.traits),
                
                this.moves          = initMoves_1.initMoves(this.classFocus);
            }

            initTraits( gender ) {
                let baseTraits = characterBlueprint_1.getBaseTraits( gender );
                return {
                    STR : baseTraits.STR + 2,
                    END : baseTraits.END + 2,
                    INT : baseTraits.INT - 3,
                    AGI : baseTraits.AGI + 2,
                    CHA : baseTraits.CHA,
                    FIN : baseTraits.FIN - 3
                }
            }
        },

        Developer : class extends characterBlueprint_1.characterBlueprint {
            constructor (name, gender) {
                super(name, gender),

                this.className     = "Developer",

                this.classFocus   = [ "END", "INT" ],

                this.description   = "Skilled but unattractive, the developer likes to play it safe. High Intelligence and Endurance stats.  Might have anxious reactions to social contact or attractive people.",

                this.uniqueAttack  = {
                    'Sprint review' : { 
                        description: 'Greatly increases the developers Willpower, Perception and Wisdom. Has a small chance of backfiring and sharply lowering Endurance stats.' 
                    }
                },

                this.traits         = this.initTraits( this.gender ),

                this.skills         = initSkills_1.calcSkills(this.traits),
                
                this.stats          = initStats.calcStats(this.traits),
                
                this.moves          = initMoves_1.initMoves(this.classFocus);
            }

            initTraits( gender ) {
                let baseTraits = characterBlueprint_1.getBaseTraits( gender );
                return {
                    STR : baseTraits.STR - 2,
                    END : baseTraits.END + 2,
                    INT : baseTraits.INT + 3,
                    AGI : baseTraits.AGI - 1,
                    CHA : baseTraits.CHA - 2,
                    FIN : baseTraits.FIN
                }
            }
        },

        Neckbeard : class extends characterBlueprint_1.characterBlueprint {
            constructor (name, gender) {
                super(name, gender),

                this.className     = "Neckbeard",

                this.classFocus   = [ "INT" ],

                this.description   = "The internet neckbeard has a lot in common with the developer, but lacks their Endurance. This high-intelligence, low everything-else class is one of the most difficult to use effectively.",

                this.uniqueAttack  = {
                    'Induce cringe' : { 
                        description: 'Deals damage by inducing intense cringe in the opponent. Damage dealt is based on the Intelligence and Charisma traits.' 
                    }
                },

                this.traits         = this.initTraits( this.gender ),

                this.skills         = initSkills_1.calcSkills(this.traits),
                
                this.stats          = initStats.calcStats(this.traits),
                
                this.moves          = initMoves_1.initMoves(this.classFocus);
            }

            initTraits( gender ) {
                let baseTraits = characterBlueprint_1.getBaseTraits( gender );
                return {
                    STR : baseTraits.STR,
                    END : baseTraits.END - 1,
                    INT : baseTraits.INT + 3,
                    AGI : baseTraits.AGI - 1,
                    CHA : baseTraits.CHA - 5,
                    FIN : baseTraits.FIN
                }
            }
        }    
    };

    var initClasses_1 = {
        initClasses
    };

    const docReady = (fn) => {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    };

    // Get value of input fiel with ID
    const getInputVal = (id) => {
        return document.getElementById(id).value
    };   

    //Return front Canvas ctx
    const getFrontCanvasContext = () => {
        let canv = document.getElementsByTagName('canvas')[1];

        let ctx = canv.getContext('2d');

        return ctx
    };

    var utilFunctions = {
        docReady,
        getInputVal,
        getFrontCanvasContext
    };

    // This file should store all global constants

    var globals = {

        // speed for characters
        MOVEMENT_SPEED : 1.85,

        // for us in movement animation
        FACING_DOWN    : 0,
        FACING_UP      : 3,
        FACING_LEFT    : 1,
        FACING_RIGHT   : 2,

        // animation frame limit
        FRAME_LIMIT    : 12,

        // canvas dimensions
        GRID_BLOCK_PX  : 37,
        GRID_WIDTH     : 888,
        GRID_HEIGHT    : 592
        
    };

    const gridGetter = () => {
        /* const newOverworld  = overworlds[gridName]
        const dimensions    = getDimensionsInPixels(newOverworld) */

        fetch('/public/overworlds/my-neighbourhood/my-house.json')
            .then( (response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                console.log(response);
                response.json();
            })
            .then( (mapJson) => {
                console.log(mapJson);
            });

    };

    var getGrid = {
        gridGetter
    };

    const initCanvas = (canvasNum) => {
        // canvasNum === 0 generates background Canvas
        // 1 generates the front canvas
        const canvas    = document.getElementsByTagName('canvas')[canvasNum];
        canvas.classList.remove('do-not-display');
        let ctx         = canvas.getContext('2d');
        ctx.canvas.height   = 592;
        ctx.canvas.width    = 888;

        if (canvasNum === 0) {

            canvas.id           = 'game-background-canvas';

            drawMap(ctx,  ctx.canvas.width, ctx.canvas.height);    

        } else {
            canvas.id           = 'game-front-canvas';
        }

        return ctx
    };

    const drawMap = (ctx, canvWidth, canvHeight) => {
        let bgImage = new Image();

        let imageSrc = './images/gridExp.jpg';     

        
        getGrid.gridGetter();
        
        bgImage.onload = ( ) => {
            ctx.drawImage(bgImage, 0, 0, canvWidth, canvHeight);                
        };

        bgImage.src = imageSrc;
    };

    var initOverworld = {
        initCanvas
    };

    const classList = initClasses_1.initClasses;

    const getCharWithClass = ( className, name, gender ) => {
        for ( let classKey in classList ) { 
            if ( classKey === className ) {
                return new classList[className](name, gender)
            }
        }

    };

    var initCharacter = {
        // entry point to create a class with associated logic. Called from createCharInstance
        getCharWithClass
    };

    const initGamePiece  = ( cellSize ) => {
        return new gamePiece(  cellSize )
    };

    // The gamePiece class will be assigned to all overworld characters in the game

    class gamePiece {
        constructor ( cellSize ) {

            // XY object to determine location
            // Cells will be used to determine the location 
            // of the character in the overworld
            // still experimental
            this.xy             = { 
                x       : cellSize, 
                y       : cellSize,
                cell    : cellSize + ', ' + cellSize
            };

            // The three following properties have arbitrary values (for now)
            this.width          = cellSize;
            this.height         = cellSize * 1.5;
            this.animLoop       = [ 0, 1, 2, 3];

            this.animIterator   = 0;
            this.direction      = 0;

            this.ctx            = utilFunctions.getFrontCanvasContext( );
            this.sprite         = getSprite( this.xy.x, this.xy.y, this.width, this.height );    
            this.getXY          = ( ) => {
                return this.xy
            };
        }
    }

    const getSprite = ( x, y, width, height ) => {

        console.log( x, y, width, height );

        let newSprite = new Image();

        newSprite.onload = ( ) => {
            var ctx = utilFunctions.getFrontCanvasContext( ); 
            ctx.drawImage(newSprite, 0, 0, 37, 37, x, y, width, height);                
        };

        // this should be made dynamic at some point
        newSprite.src =  './sprites-and-tiles/sprites/animation_guy.png';      

        return newSprite
    };

    var initGamePiece_1 = {
        initGamePiece
    };

    const getCharacter = ( className, name, gender ) => {
        return {
            
            // entry point for creating a character
            // is called from GfxContainer.svelte

            characterState : initCharacter.getCharWithClass( className, name, gender ),
            characterPiece : initGamePiece_1.initGamePiece(globals.GRID_BLOCK_PX)               
        }
     
    };

    var createCharInstance = {
        getCharacter
    };

    let frameCount = 0;
    let playerCharacter;
    let pressedKeys = {};

    const initMovement = (character) => {
        playerCharacter = character;
        window.requestAnimationFrame(movementController);
    };

    // this function gets called by Window.requestAnimationFrame about 60 times per second
    // The pressedKeys variable is manipulated in GfxContainer with Eventlisteners

    const movementController = ( ) => {    
        
        let frontContext = playerCharacter.ctx;
            
        frontContext.clearRect( 
            playerCharacter.xy.x, playerCharacter.xy.y, 
            playerCharacter.width, playerCharacter.height
        );

        let hasMoved = false;

        if ( pressedKeys.d ) {
            playerCharacter.xy.x += globals.MOVEMENT_SPEED;
            playerCharacter.direction = globals.FACING_RIGHT;
            hasMoved = true;
        }
        if ( pressedKeys.a ) {
            playerCharacter.xy.x  -= globals.MOVEMENT_SPEED;
            playerCharacter.direction = globals.FACING_LEFT;
            hasMoved = true;
        }
        if ( pressedKeys.w ) {
            playerCharacter.xy.y  -= globals.MOVEMENT_SPEED;
            playerCharacter.direction = globals.FACING_UP;
            hasMoved = true;
        }
        if ( pressedKeys.s ) {
            playerCharacter.xy.y  += globals.MOVEMENT_SPEED;
            playerCharacter.direction = globals.FACING_DOWN;
            hasMoved = true;
        }

        if (hasMoved) {

            frameCount++;
        
            if (frameCount >= globals.FRAME_LIMIT) {
                frameCount = 0;
                playerCharacter.animIterator++;

                if (playerCharacter.animIterator >= playerCharacter.animLoop.length) {
                    playerCharacter.animIterator = 0;
                }
            }
        }
        
        // see helpers/docs.js for a description of drawImage's parameters
        frontContext.drawImage(
            playerCharacter.sprite,
            playerCharacter.animLoop[playerCharacter.animIterator] * globals.GRID_BLOCK_PX, 
            playerCharacter.direction * globals.GRID_BLOCK_PX, 
            globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX,
            playerCharacter.xy.x, playerCharacter.xy.y, playerCharacter.width, playerCharacter.height
        );

        window.requestAnimationFrame(movementController);
    };

    var movement = {
        pressedKeys,
        initMovement
    };

    /* src\game-container\game-gfx-container\GfxContainer.svelte generated by Svelte v3.12.1 */

    const file = "src\\game-container\\game-gfx-container\\GfxContainer.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.className = list[i];
    	return child_ctx;
    }

    // (115:16) {#each Object.keys(classList.initClasses) as className}
    function create_each_block(ctx) {
    	var option, t0_value = ctx.className + "", t0, t1, option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t0 = text(t0_value);
    			t1 = space();
    			option.__value = option_value_value = ctx.className;
    			option.value = option.__value;
    			add_location(option, file, 115, 20, 3161);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t0);
    			append_dev(option, t1);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.classList) && t0_value !== (t0_value = ctx.className + "")) {
    				set_data_dev(t0, t0_value);
    			}

    			if ((changed.classList) && option_value_value !== (option_value_value = ctx.className)) {
    				prop_dev(option, "__value", option_value_value);
    			}

    			option.value = option.__value;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(option);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(115:16) {#each Object.keys(classList.initClasses) as className}", ctx });
    	return block;
    }

    function create_fragment(ctx) {
    	var div3, div2, div0, h3, t0, br0, t1, span, t3, div1, label0, t5, input, t6, label1, t8, select0, option0, option1, option2, t12, label2, t14, select1, t15, br1, t16, button, t18, canvas0, t19, canvas1, dispose;

    	let each_value = Object.keys(ctx.classList.initClasses);

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			t0 = text("Welcome to ");
    			br0 = element("br");
    			t1 = space();
    			span = element("span");
    			span.textContent = "NECKBEARD 2020";
    			t3 = space();
    			div1 = element("div");
    			label0 = element("label");
    			label0.textContent = "Name your character!";
    			t5 = space();
    			input = element("input");
    			t6 = space();
    			label1 = element("label");
    			label1.textContent = "Choose your gender!";
    			t8 = space();
    			select0 = element("select");
    			option0 = element("option");
    			option0.textContent = "Male ";
    			option1 = element("option");
    			option1.textContent = "Female ";
    			option2 = element("option");
    			option2.textContent = "None of your business";
    			t12 = space();
    			label2 = element("label");
    			label2.textContent = "Choose your class!";
    			t14 = space();
    			select1 = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t15 = space();
    			br1 = element("br");
    			t16 = space();
    			button = element("button");
    			button.textContent = "Ok let's go!!!";
    			t18 = space();
    			canvas0 = element("canvas");
    			t19 = space();
    			canvas1 = element("canvas");
    			add_location(br0, file, 97, 27, 2507);
    			add_location(span, file, 98, 12, 2527);
    			add_location(h3, file, 97, 12, 2492);
    			add_location(div0, file, 96, 8, 2473);
    			add_location(label0, file, 102, 12, 2606);
    			attr_dev(input, "id", "name");
    			add_location(input, file, 103, 12, 2655);
    			add_location(label1, file, 105, 12, 2688);
    			option0.__value = "Male";
    			option0.value = option0.__value;
    			add_location(option0, file, 107, 16, 2774);
    			option1.__value = "Female";
    			option1.value = option1.__value;
    			add_location(option1, file, 108, 16, 2829);
    			option2.__value = "None of your business";
    			option2.value = option2.__value;
    			add_location(option2, file, 109, 16, 2887);
    			attr_dev(select0, "id", "gender");
    			add_location(select0, file, 106, 12, 2736);
    			add_location(label2, file, 112, 12, 3000);
    			attr_dev(select1, "id", "class");
    			add_location(select1, file, 113, 12, 3047);
    			add_location(br1, file, 119, 12, 3280);
    			add_location(button, file, 121, 12, 3302);
    			add_location(div1, file, 101, 8, 2587);
    			attr_dev(div2, "id", "intro-screen");
    			add_location(div2, file, 94, 4, 2438);
    			attr_dev(canvas0, "class", "game-background-body do-not-display svelte-1ugpmht");
    			add_location(canvas0, file, 128, 4, 3428);
    			attr_dev(canvas1, "class", "game-front-body do-not-display svelte-1ugpmht");
    			add_location(canvas1, file, 130, 4, 3498);
    			attr_dev(div3, "class", "game-gfx-container svelte-1ugpmht");
    			add_location(div3, file, 92, 0, 2398);
    			dispose = listen_dev(button, "click", ctx.startGame);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, h3);
    			append_dev(h3, t0);
    			append_dev(h3, br0);
    			append_dev(h3, t1);
    			append_dev(h3, span);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, label0);
    			append_dev(div1, t5);
    			append_dev(div1, input);
    			append_dev(div1, t6);
    			append_dev(div1, label1);
    			append_dev(div1, t8);
    			append_dev(div1, select0);
    			append_dev(select0, option0);
    			append_dev(select0, option1);
    			append_dev(select0, option2);
    			append_dev(div1, t12);
    			append_dev(div1, label2);
    			append_dev(div1, t14);
    			append_dev(div1, select1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select1, null);
    			}

    			append_dev(div1, t15);
    			append_dev(div1, br1);
    			append_dev(div1, t16);
    			append_dev(div1, button);
    			append_dev(div3, t18);
    			append_dev(div3, canvas0);
    			append_dev(div3, t19);
    			append_dev(div3, canvas1);
    		},

    		p: function update(changed, ctx) {
    			if (changed.classList) {
    				each_value = Object.keys(ctx.classList.initClasses);

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div3);
    			}

    			destroy_each(each_blocks, detaching);

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	
        
        let { classList, gameState } = $$props;

        let frontContext;
        let backContext;

        const startGame = () => {
            const charName      =  utilFunctions.getInputVal('name');
            const charGender    =  utilFunctions.getInputVal('gender');
            const charClass     =  utilFunctions.getInputVal('class');

            // The setTimeouts setup is not definitive and might change later
            setTimeout( () => {
                document.getElementById('intro-screen').remove();

            }, 50 );

            setTimeout( () => {
                backContext     = initOverworld.initCanvas(0);      
                frontContext    = initOverworld.initCanvas(1);     
            }, 75 );
            
            setTimeout( () => {
                $$invalidate('gameState', gameState.playerCharacter = createCharInstance.getCharacter( charClass, charName, charGender ), gameState);           

                movement.initMovement(gameState.playerCharacter.characterPiece);

            }, 100 );
        };

        // Event listener to handle keyboard presses
        // Movement and animation logic is handled in /gane/game-ui/movement.js
        const prepareUI = () => {
            window.addEventListener('keydown', (event) => {
                movement.pressedKeys[event.key] = true;
            });
            window.addEventListener('keyup', () => {
                movement.pressedKeys[event.key] = false;
            });
        };


        utilFunctions.docReady(
            prepareUI()
        );

    	const writable_props = ['classList', 'gameState'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<GfxContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('classList' in $$props) $$invalidate('classList', classList = $$props.classList);
    		if ('gameState' in $$props) $$invalidate('gameState', gameState = $$props.gameState);
    	};

    	$$self.$capture_state = () => {
    		return { classList, gameState, frontContext, backContext };
    	};

    	$$self.$inject_state = $$props => {
    		if ('classList' in $$props) $$invalidate('classList', classList = $$props.classList);
    		if ('gameState' in $$props) $$invalidate('gameState', gameState = $$props.gameState);
    		if ('frontContext' in $$props) frontContext = $$props.frontContext;
    		if ('backContext' in $$props) backContext = $$props.backContext;
    	};

    	return { classList, gameState, startGame };
    }

    class GfxContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["classList", "gameState"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "GfxContainer", options, id: create_fragment.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.classList === undefined && !('classList' in props)) {
    			console.warn("<GfxContainer> was created without expected prop 'classList'");
    		}
    		if (ctx.gameState === undefined && !('gameState' in props)) {
    			console.warn("<GfxContainer> was created without expected prop 'gameState'");
    		}
    	}

    	get classList() {
    		throw new Error("<GfxContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classList(value) {
    		throw new Error("<GfxContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gameState() {
    		throw new Error("<GfxContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gameState(value) {
    		throw new Error("<GfxContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\game-container\game-ui-container\UIContainer.svelte generated by Svelte v3.12.1 */

    const file$1 = "src\\game-container\\game-ui-container\\UIContainer.svelte";

    function create_fragment$1(ctx) {
    	var div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "game-ui-container svelte-2t4vdp");
    			add_location(div, file$1, 11, 0, 205);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    class UIContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$1, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "UIContainer", options, id: create_fragment$1.name });
    	}
    }

    /* src\game-container\game-txt-container\TxtContainer.svelte generated by Svelte v3.12.1 */

    const file$2 = "src\\game-container\\game-txt-container\\TxtContainer.svelte";

    function create_fragment$2(ctx) {
    	var div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "game-txt-container svelte-1khomd6");
    			add_location(div, file$2, 11, 0, 233);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    class TxtContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$2, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "TxtContainer", options, id: create_fragment$2.name });
    	}
    }

    /* src\game-container\MainContainer.svelte generated by Svelte v3.12.1 */

    const file$3 = "src\\game-container\\MainContainer.svelte";

    function create_fragment$3(ctx) {
    	var div, t0, t1, current;

    	var gfxcontainer = new GfxContainer({
    		props: {
    		classList: initClasses_1,
    		gameState: ctx.gameState
    	},
    		$$inline: true
    	});

    	var txtcontainer = new TxtContainer({ $$inline: true });

    	var uicontainer = new UIContainer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			gfxcontainer.$$.fragment.c();
    			t0 = space();
    			txtcontainer.$$.fragment.c();
    			t1 = space();
    			uicontainer.$$.fragment.c();
    			attr_dev(div, "class", "main-container svelte-b4k9w5");
    			add_location(div, file$3, 24, 0, 655);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(gfxcontainer, div, null);
    			append_dev(div, t0);
    			mount_component(txtcontainer, div, null);
    			append_dev(div, t1);
    			mount_component(uicontainer, div, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var gfxcontainer_changes = {};
    			if (changed.gameState) gfxcontainer_changes.gameState = ctx.gameState;
    			gfxcontainer.$set(gfxcontainer_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(gfxcontainer.$$.fragment, local);

    			transition_in(txtcontainer.$$.fragment, local);

    			transition_in(uicontainer.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(gfxcontainer.$$.fragment, local);
    			transition_out(txtcontainer.$$.fragment, local);
    			transition_out(uicontainer.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_component(gfxcontainer);

    			destroy_component(txtcontainer);

    			destroy_component(uicontainer);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	

        let { gameState } = $$props;

    	const writable_props = ['gameState'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<MainContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('gameState' in $$props) $$invalidate('gameState', gameState = $$props.gameState);
    	};

    	$$self.$capture_state = () => {
    		return { gameState };
    	};

    	$$self.$inject_state = $$props => {
    		if ('gameState' in $$props) $$invalidate('gameState', gameState = $$props.gameState);
    	};

    	return { gameState };
    }

    class MainContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$3, safe_not_equal, ["gameState"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "MainContainer", options, id: create_fragment$3.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.gameState === undefined && !('gameState' in props)) {
    			console.warn("<MainContainer> was created without expected prop 'gameState'");
    		}
    	}

    	get gameState() {
    		throw new Error("<MainContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gameState(value) {
    		throw new Error("<MainContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\footer.svelte generated by Svelte v3.12.1 */

    const file$4 = "src\\footer.svelte";

    function create_fragment$4(ctx) {
    	var div, span;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			span.textContent = "IRL - RPG";
    			add_location(span, file$4, 8, 4, 131);
    			attr_dev(div, "class", "footer svelte-tvy6xy");
    			add_location(div, file$4, 7, 0, 105);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$4.name, type: "component", source: "", ctx });
    	return block;
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$4, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Footer", options, id: create_fragment$4.name });
    	}
    }

    /* src\header.svelte generated by Svelte v3.12.1 */

    const file$5 = "src\\header.svelte";

    function create_fragment$5(ctx) {
    	var div, span;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			span.textContent = "IRL - RPG";
    			add_location(span, file$5, 8, 4, 134);
    			attr_dev(div, "class", "header svelte-jwsxw2");
    			add_location(div, file$5, 7, 0, 108);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$5.name, type: "component", source: "", ctx });
    	return block;
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$5, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Header", options, id: create_fragment$5.name });
    	}
    }

    /* src\App.svelte generated by Svelte v3.12.1 */

    const file$6 = "src\\App.svelte";

    function create_fragment$6(ctx) {
    	var div, t0, t1, current;

    	var header = new Header({ $$inline: true });

    	var maincontainer = new MainContainer({
    		props: { gameState: ctx.gameState },
    		$$inline: true
    	});

    	var footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			header.$$.fragment.c();
    			t0 = space();
    			maincontainer.$$.fragment.c();
    			t1 = space();
    			footer.$$.fragment.c();
    			attr_dev(div, "class", "svelte-tiib54");
    			add_location(div, file$6, 19, 0, 279);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(header, div, null);
    			append_dev(div, t0);
    			mount_component(maincontainer, div, null);
    			append_dev(div, t1);
    			mount_component(footer, div, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var maincontainer_changes = {};
    			if (changed.gameState) maincontainer_changes.gameState = ctx.gameState;
    			maincontainer.$set(maincontainer_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);

    			transition_in(maincontainer.$$.fragment, local);

    			transition_in(footer.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(maincontainer.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_component(header);

    			destroy_component(maincontainer);

    			destroy_component(footer);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$6.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	

    	let { gameState } = $$props;

    	const writable_props = ['gameState'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('gameState' in $$props) $$invalidate('gameState', gameState = $$props.gameState);
    	};

    	$$self.$capture_state = () => {
    		return { gameState };
    	};

    	$$self.$inject_state = $$props => {
    		if ('gameState' in $$props) $$invalidate('gameState', gameState = $$props.gameState);
    	};

    	return { gameState };
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$6, safe_not_equal, ["gameState"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$6.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.gameState === undefined && !('gameState' in props)) {
    			console.warn("<App> was created without expected prop 'gameState'");
    		}
    	}

    	get gameState() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gameState(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,

    	// I should probably write a function here to check screen size
    	// And then pass the dynamically generated cell-size down as a prop
    	// to use that in GfxContainer to draw the canvas and char sprites

    	props: {
    		name: 'world',
    		gameState : {
    			cinematicState : {
    				cinematic 		: false
    			},

    			overWorldState : {
    				overworld		: true,
    				activeOverworld	: 'overWorld1',
    				overWorldData : {

    				}

    			},

    			battleState 	: {
    				battle			: false
    			},

    			playerCharacter : {
    				characterState : {

    				},

    				characterPiece : {
    					x				: '',
    					y				: ''
    				}				
    			}


    		}
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
