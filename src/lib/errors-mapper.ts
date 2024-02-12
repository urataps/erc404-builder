export function mapWalletErrorsToMessage(error: unknown) {
  const defaultErrorMessage = 'Something horribly wrong happened with your transaction.';

  if (
    error !== null &&
    error !== undefined &&
    typeof error === 'object' &&
    'name' in error &&
    typeof error.name === 'string'
  ) {
    switch (error.name) {
      case 'SyntaxError': {
        return 'You misspelled one or more constructor arguments.';
      }
      case 'UserRejectedRequestError': {
        return 'You denied transaction signature.';
      }
      case 'TransactionExecutionError': {
        return 'Transaction reverted.';
      }
      default: {
        return defaultErrorMessage;
      }
    }
  }

  return defaultErrorMessage;
}
