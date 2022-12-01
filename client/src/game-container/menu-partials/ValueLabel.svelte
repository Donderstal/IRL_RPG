<script lang="ts">
	export let valueLabel: string;
</script>
<style>
	label {
		font-size: 1.5vh;
		color: grey;
		display: inline-block;
		width: 100%;
		text-align: left;
		margin-left: 1vw;
	}
	
    @media only screen and (max-width: 600px) {
        label {
			margin-left: 2.5vw;
        }
    }
	@media only screen and (max-height: 600px) {
		label {
			font-size: 3vh;
		}
    }
</style>
<label>
	{valueLabel}
</label>