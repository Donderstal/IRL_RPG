<script>
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";

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
                console.log(SaveFile)
            }
        }
    } buttonText={"Load game"}/>
</div>