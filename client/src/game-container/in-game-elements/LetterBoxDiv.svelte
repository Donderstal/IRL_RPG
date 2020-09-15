<script>
    export let height;
    export let isTop;
</script>

<style>
    .letterbox-div {
        width: 100vw;
        position: fixed;
        background-color: black;
        z-index: 100;
        transition: 1s ease-out;
    }
</style>

{#if isTop}
<div id="letterbox-top" class="letterbox-div" style="top: -{height}px; height: {height}px;">
</div>
{:else}
<div id="letterbox-bottom" class="letterbox-div" style="bottom: -{height}px; height: {height}px;">
</div>
{/if}