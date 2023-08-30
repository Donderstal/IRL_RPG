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

    @media only screen and (max-width: 600px) {
        .grid-inner {
            grid-template-columns: [left] 32.5% [right] 67.5%;
        }
    }
    @media only screen and (max-height: 600px) {
		div {
			margin-top: 1vh;
		}
        .right {
            margin-top: 1.5vh;
        }
                .grid-inner {
            grid-template-columns: [left] 40% [right] 60%;
        }
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