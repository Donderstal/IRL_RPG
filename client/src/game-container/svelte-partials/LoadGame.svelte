<script>
    import GoBackButton from "./GoBackButton.svelte";
    export let returnToPreviousScreen;  
    export let SaveFile;

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
    <GoBackButton returnToPreviousScreen={returnToPreviousScreen}/>
    <div>
        <label id="save_file_label">Input a save file: </label>
        <input id="save_file" type="file" on:change|self={loadJsonFile}/>
    </div>
</div>