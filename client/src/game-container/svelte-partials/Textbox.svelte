<script>
    export let text;
</script>
<style>
    p {
        font-family: "Lucida Console", Courier, monospace;
        font-size: 24px;
        margin-top: 5vh;
    }
    @media only screen and (max-width: 600px) {
        p {
            font-family: "Lucida Console", Courier, monospace;
            font-size: 18px;
        }
    }
</style>

<div>
    <p>
        {text}
    </p>
</div>