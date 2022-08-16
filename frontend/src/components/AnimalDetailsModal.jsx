import { Button, Modal } from 'react-bootstrap';
import React from 'react';
// import { useState } from 'react';
import currentAgeCalChinese from '../scripts/currentAgeCal';
import { cnTrans } from '../scripts/cnTrans';
import { dateStringToDDMMYY } from '../scripts/dateStringToDDMMYY';
function AnimalDetailsModal(props) {
	const { animal } = props;
	if (props.cardsModelState[props.index] === true) {
		return (
			<Modal
				onHide={props.handleClose}
				backdrop="static"
				keyboard={false}
				show={true}

			>
				<Modal.Header closeButton>
					<Modal.Title>詳細資料</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					品种:{' '}
					{`${animal.animalSpeciesName}<${
						animal.animalSpecies ? `${cnTrans(animal.animalSpecies)}<` : ''
					}${animal.animalGenera ? `${cnTrans(animal.animalGenera)}<` : ''}${
						animal.animalClasses ? `${cnTrans(animal.animalClasses)}` : ''
					}`}
					<br />
					名字:
					{animal.animalName}
					<br />
					品种: {animal.animalSpeciesName}
					<br />
					性別: {cnTrans(animal.animalSex)}
					<br />
					年齡: {currentAgeCalChinese(animal.postDate, animal.animalAge)}

					<br />
					{((animal.urgencyOptions === "urgent") || (animal.urgencyOptions === "mostUrgent")) ?
						<div >緊急程度: <span className='fw-bold' style={{ color: '#FF0000' }}>{cnTrans(animal.urgencyOptions)}</span></div> : <div>緊急程度:
							<span> {cnTrans(animal.urgencyOptions)}</span></div>}
						{animal.animalPrice?<div>價錢或補償: <span className='fw-bold'>${animal.animalPrice} HKD</span></div>:<div>價錢或補償: <span className='fw-bold'>免費領養</span></div>}
					健康情況: {animal.healthCondition}
					<br />
					詳細資料:: {animal.description}
					<br />
					對領養者的要求: {animal.requirementToAdopter}
					<br />
					用戶名稱: {animal.creator ? animal.creator.nickname : null}
					<br />
					聯絡資料: {animal.contactInfo}
					<br />
					交收方法: {animal.deliveryInfo}
					<br />
					張貼日期: {dateStringToDDMMYY(animal.postDate)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
export default AnimalDetailsModal;
