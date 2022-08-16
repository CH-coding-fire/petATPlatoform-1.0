import { Button, Modal } from 'react-bootstrap';
import React from 'react'

function ConfirmModal(props) {
  const confirmAdoptionSuccessParagraph = '如果你完成領養(送養者和領養者), 恭喜你!';
  const confirmDeleteParagraph = '確定要刪除帖子嗎？如果你完成領養(送養者和領養者), 請按"取消"退出, 然後按綠色的"完成領養"按鈕, 再按"刪除';
  return (
       <>
      <Modal show={true} backdrop="static" >
        <Modal.Header >
          <Modal.Title>確認{props.option === "delete" && "刪除"}
            { props.option === "adoptSuccess" && "完成領養" }?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.option === "delete" && confirmDeleteParagraph}
        {props.option === "adoptSuccess" && confirmAdoptionSuccessParagraph}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeHandler}>
            取消 Cancel
          </Button>
          <Button onClick={() => props.confirmHandler({ index:props.index, option:props.option })} variant="primary" >
            確認{props.option === "delete" && "刪除"}{props.option === "adoptSuccess" && "完成領養"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ConfirmModal