import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useAdminCreateCustomerGroup } from "medusa-react"

import Modal from "../../../components/molecules/modal"
import Input from "../../../components/molecules/input"
import Button from "../../../components/fundamentals/button"
import Metadata, { MetadataField } from "../../../components/organisms/metadata"
import { getErrorMessage } from "../../../utils/error-messages"
import useNotification from "../../../hooks/use-notification"

type P = {
  handleClose: () => void
}

function AddCustomerGroupModal(props: P) {
  const { handleClose } = props

  const notification = useNotification()
  const { mutate } = useAdminCreateCustomerGroup()

  const [metadata, setMetadata] = useState<MetadataField[]>([])

  const { register, handleSubmit } = useForm()

  const submit = (data) => {
    const meta = {}

    metadata.forEach((m) => (meta[m.key] = m.value))
    data.metadata = meta
    mutate(data, {
      onSuccess: () => {
        notification(
          "Success",
          "Successfully created the customer group",
          "success"
        )
        handleClose()
      },
      onError: (err) => notification("Error", getErrorMessage(err), "error"),
    })
  }

  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">
            Create a New Customer Group
          </span>
        </Modal.Header>
        <Modal.Content>
          <div className="space-y-4">
            <span className="inter-base-semibold">Details</span>
            <div className="flex space-x-4">
              <Input
                label="Title"
                name="name"
                placeholder="Customer group name"
                required
                ref={register}
              />
            </div>
          </div>

          <div className="mt-8">
            <Metadata metadata={metadata} setMetadata={setMetadata} />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full h-8 justify-end">
            <Button
              variant="ghost"
              className="mr-2 w-32 text-small justify-center"
              size="large"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              size="medium"
              className="w-32 text-small justify-center"
              variant="primary"
              onClick={handleSubmit(submit)}
            >
              Publish Group
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default AddCustomerGroupModal