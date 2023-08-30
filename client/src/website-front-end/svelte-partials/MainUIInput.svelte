<script>   
    export let elementId;
    export let type;
    export let placeholder;
    export let onChange;
</script>

<style>
    input {
        color:#D82BBA;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 4px solid #D82BBA;
        opacity: 1;
        font-size: 2.6vh
    }
</style>

<input id={elementId} type={type} placeholder={placeholder} name={elementId} on:input={onChange}/>