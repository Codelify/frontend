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

const DialogPopup = ({
  isOpen, 
  onClose, 
  dialogContent, 
  dialogIcon = null,
  cancelButton, 
  confirmButton = null, 
  confirmCallback = null
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
  <AlertDialogContent>
    <AlertDialogHeader fontSize="lg" fontWeight="bold">
    </AlertDialogHeader>        
    <AlertDialogBody>
      <Stack isInline spacing={6} alignItems="center" >
      <Box as={ dialogIcon ? dialogIcon : "div"} color="red.400" size="64px"/>
      <Text fontSize="xl" >
        { dialogContent }
      </Text>
      </Stack>
    </AlertDialogBody>
    <AlertDialogFooter>
        <Button size="sm" ref={cancelRef} onClick={onClose} _focus={{outline:"none"}} >
          { cancelButton }
        </Button>
      {
        confirmButton && 
        <Button size="sm" variantColor="teal" onClick={handleConfirm} ml={3}>
          { confirmButton }
        </Button>      
      }
    </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog>
  )
}

export default DialogPopup;