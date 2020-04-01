import React from 'react'
import { 
  Box, 
  Button, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Stack,   
  Text,
} from "@chakra-ui/core";

const DialogModal = ({
  isOpen, 
  onClose, 
  dialogContent, 
  dialogIcon = null,
  dialogHeader = null,
  cancelButton, 
  confirmButton = null, 
  confirmCallback = null,
  isLoading = false
}) => {

  const cancelRef = React.useRef();  
  const handleConfirm = () => {
    // run confirm call back function
    confirmCallback();
    // then close
    onClose()
  }

  return (
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
  <AlertDialogOverlay />
  <AlertDialogContent borderRadius="5px">
    <AlertDialogHeader fontSize="lg" fontWeight="bold">
    {
      dialogHeader && dialogHeader
    }
    </AlertDialogHeader>        
    <AlertDialogBody>
      <Stack isInline spacing={6} alignItems="center" >
      <Box as={ dialogIcon ? dialogIcon : "div"} color="red.400" size={ dialogIcon ? "48px" : "0px"}/>
      <Text fontSize="xl" >
        { dialogContent }
      </Text>
      </Stack>
    </AlertDialogBody>
    <AlertDialogFooter>
        <Button size="lg" ref={cancelRef} onClick={onClose} _focus={{outline:"none"}} >
          { cancelButton }
        </Button>
      {
        confirmButton && 
        <Button isLoading={isLoading} size="lg" variantColor="teal" onClick={handleConfirm} ml={3}>
          { confirmButton }
        </Button>      
      }
    </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog>
  )
}

export default DialogModal;