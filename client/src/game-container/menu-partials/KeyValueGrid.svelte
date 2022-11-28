<script>
    import KeyLabel from './KeyLabel.svelte';
    import ValueLabel from './ValueLabel.svelte';

    export let keyValuePairs;
</script>
<style>
    .grid-inner {
        display: grid;
        grid-template-columns: [left] 30% [right] 70%;
        grid-template-rows: repeat(1, 1fr);
    }

    .left {
        grid-column-start: left;
        grid-column-end: span 1;
    }

    .right {
        grid-column-start: right;
        grid-column-end: span 1;
    }
</style>

<div class="grid-inner">
    {#each keyValuePairs as keyValuePair}
        <div class="left">
            <KeyLabel keyLabel={keyValuePair[0]}/>
        </div>
        <div class="right">
            <ValueLabel valueLabel={keyValuePair[1]}/>
        </div>
    {/each}
</div>    