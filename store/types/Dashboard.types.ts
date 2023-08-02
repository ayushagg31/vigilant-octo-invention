export type DashboardStoreTypes = {
  currentTab: string;
  activeResultTab: string;
  isUploading: boolean;
  showResult: boolean;
  apiFailure: boolean;
  result: any;

  setCurrentTab: (tabName: string) => void;
  setAcitveResultTab: (tabName: string) => void;
  setApiFailure: (failureState: boolean) => void;
  handleFileUpload: (formData: FormData) => void; 
}
