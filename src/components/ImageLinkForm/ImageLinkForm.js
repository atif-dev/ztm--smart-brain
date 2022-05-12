import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return(

			<div>

				<p className = 'f3'>
					{'This Magic Brain will detect faces in your pictures. Give it a try. Need Help? Touch/Drag mouse over or around yellow box.'}
				</p>

				<div className = 'center'>
					<div className = 'form center pa4 br3 shadow-5'>
					<input className = 'f4 pa2 w-70 center' type = 'text' onChange = {onInputChange}/>
					<button 
					className = 'w-30 grow f4 link ph3 dib white bg-light-purple' 
					onClick={onButtonSubmit}>
					Detect</button>
					</div>

				</div>

				<span className = 'f3'>{'Google an image and copy image address/image link. Paste image address above and press Detect.'}</span>
				
			</div>
			
		  );
}

export default ImageLinkForm;