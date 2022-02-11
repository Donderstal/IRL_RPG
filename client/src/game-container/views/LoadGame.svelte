<script>
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import { loadGameFromJSON } from "../stores.js"

    let SaveFile = false;

    const loadJsonFile = (event) => {
        let reader = new FileReader();
            reader.onload = (event) =>{
                SaveFile = JSON.parse(event.target.result);
            }
            reader.readAsText(event.target.files[0]);
    }
</script>
<style>
    .load-game-div {
        height: 80vh;
        background-color: transparent;
    }
</style>

<div class="load-game-div">
    <GoBackButton/>
    <div>
        <label id="save_file_label">Input a save file: </label>
        <input id="save_file" type="file" on:change|self={loadJsonFile}/>
    </div>
    <MainUiButton action={
        () => { 
            if ( SaveFile ) {
                loadGameFromJSON(SaveFile)
            }
        }
    } buttonText={"Load game"}/>
</div>