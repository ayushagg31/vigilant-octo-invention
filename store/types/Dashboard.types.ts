export type DashboardStoreTypes = {
  currentTab: string;
  activeResultTab: string;
  isUploading: boolean;
  showResult: boolean;
  apiFailure: boolean;
  result: {
    collectionId: string;
    message: string;
  };

  setCurrentTab: (tabName: string) => void;
  setAcitveResultTab: (tabName: string) => void;
  setApiFailure: (failureState: boolean) => void;
  handleFileUpload: (formData: FormData) => void;
}
