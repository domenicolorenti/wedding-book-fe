"use client"

import {
  Toaster as ChakraToaster,
  Box,
  CloseButton,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"
import { appTheme } from "@/config/theme"
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi"

export const toaster = createToaster({
  placement: "top",
  duration: 2000,
})

const ToastIcon = ({ type }: { type: string | undefined }) => {
  switch (type) {
    case "success":
      return <Box as={FiCheckCircle} color="green.500" fontSize="xl" />
    case "error":
      return <Box as={FiAlertCircle} color="red.500" fontSize="xl" />
    case "info":
      return <Box as={FiInfo} color="blue.500" fontSize="xl" />
    case "loading":
      return <Spinner size="md" color={appTheme.colors.primary} />
    default:
      return null
  }
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} gap={3} inset={{ base: "4", md: "6" }}>
        {(toast) => (
          <Toast.Root
            bg="white/95"
            backdropFilter="blur(20px)"
            p={4}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor="white"
            width={{ base: "auto", sm: "sm" }}
            maxW="calc(100vw - 2rem)"
            display="flex"
            alignItems="center"
            gap={3}
          >
            <ToastIcon type={toast.type} />
            <Stack gap="0.5" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title fontWeight="semibold" color="gray.900" fontSize="md">{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description color="gray.600" fontSize="sm" lineHeight="short">
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && (
              <Toast.CloseTrigger asChild>
                <CloseButton size="sm" color="gray.500" _hover={{ bg: "gray.100" }} position="absolute" top="1.5" right="1.5" />
              </Toast.CloseTrigger>
            )}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
