<script lang="ts">
	export let keyLabel: string;
</script>
<style>
	label {
		font-size: 1.75vh;
		color: white;
		display: inline-block;
		width: 100%;
		text-align: right;
	}
	@media only screen and (max-height: 600px) {
		label {
			font-size: 3.5vh;
		}
    }
</style>
<label>
	{keyLabel}:
</label>