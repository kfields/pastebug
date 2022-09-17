import { useUserStore } from 'stores/user';
import { Paste } from 'models/paste'

const { isSignedIn } = useUserStore();

function canCreatePaste(): boolean {
  return isSignedIn;
}

function canUpdatePaste(paste: Paste): boolean {
  return isSignedIn;
  //return paste.
}

export default function usePasteAbilities() {
  return {
    canCreatePaste,
    canUpdatePaste,
  };
}
