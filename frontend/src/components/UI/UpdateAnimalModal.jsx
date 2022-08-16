import { Button, Modal } from 'react-bootstrap';
import React from 'react'
import FormikContainer from '../Form/FormikContainer';

function UpdateAnimalModal(props) {
  console.log('detail Modal says hi')
  return (
      <>
          <Modal show={true} backdrop="static"  backdropClassName="opacity-0">
              <FormikContainer
          updateAnimalHandler={props.updateAnimalHandler}
          closeUpdateAnimalModalHandler={props.closeUpdateAnimalModalHandler}
          animalToBeUpdated={{ ...props }} />
      </Modal>
    </>
  )
}

export default UpdateAnimalModal