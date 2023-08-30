<script lang="ts">
    import { InteractionAnswer } from '../../enumerables/InteractionAnswer';
    import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
	import MainUiButton from '../svelte-partials/MainUiButton.svelte';

	export let modalType: SceneAnimationType;
	export let message: string;
	export let deactivate;

	const registerClick = ( userSelection: InteractionAnswer ): void =>{
		deactivate( userSelection );
	}
</script>
<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-container {
		background: #00384D 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        width: 50vw;
		height: 33vh;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		border: groove 1px #64005380;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		box-shadow: .5vh .5vh .25vh #64005380;

		display: grid;
		grid-template-columns: [marginLeft] 5% [leftColumn] 45% [rightColumn] 45% [marginRight] 5%;
        grid-template-rows: [marginTop] 5% [topRow] 45% [bottomRow] 45% [marginBottom] 5%;
	}
	@media only screen and (max-width: 600px) {
        .modal-container {
            width: 75vw;
        }
    }

    @media only screen and (max-height: 600px) {
        .modal-container {
            width: 50vw;
			height: 75vh;
        }   
    }

	.modal-message-div {
		grid-column-start: leftColumn;
		grid-column-end: span 2;
		grid-row-start: topRow;
		grid-row-end: span 1;
	}

	.yes-button-container {
		grid-column-start: leftColumn;
		grid-column-end: span 1;
		grid-row-start: bottomRow;
		grid-row-end: span 1;
	}
	
	.no-button-container {
		grid-column-start: rightColumn;
		grid-column-end: span 1;
		grid-row-start: bottomRow;
		grid-row-end: span 1;
	}
	
	.ok-button-container {
		grid-column-start: leftColumn;
		grid-column-end: span 2;
		grid-row-start: bottomRow;
		grid-row-end: span 1;
	}
</style>
<div class="modal-background">
	<div class="modal-container">
		<div class="modal-message-div">
			<p>{message}</p>
		</div>
		{#if modalType === SceneAnimationType.speakYesNo }
			<div class="yes-button-container">
				<MainUiButton buttonText={"Ok"} clickable={true} action={ ()=>{registerClick(InteractionAnswer.yes)} }/>
			</div>
			<div class="no-button-container">
				<MainUiButton buttonText={"Cancel"} clickable={true} action={ ()=>{registerClick(InteractionAnswer.no)} }/>
			</div>
		{:else}
			<div class="ok-button-container">
				<MainUiButton buttonText={"Ok"} clickable={true} action={ ()=>{registerClick(InteractionAnswer.yes) } }/>
			</div>
		{/if}
	</div>
</div>