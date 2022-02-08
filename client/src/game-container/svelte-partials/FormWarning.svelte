<script>
import { onMount } from "svelte";

   
    export let text;
    let width;

    onMount( () => {
        width = text.length + 'ch';
    });
</script>

<style>
    input {
        color:red;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        opacity: 1;
        font-size: 1.3vh;
        text-align: center;
    }
</style>

<input class="form-warning" readonly value={text} style="width: {width};">