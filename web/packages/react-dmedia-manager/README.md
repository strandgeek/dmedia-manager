# React dMedia Manager

This is the react library for integrating [dMedia Manager](https://dmedia-manager.strandgeek.com) into a dApp.


### Usage

See below the minimal example to integrate the dMedia Manager Picker into your dApp:

```react
import { MediaPicker, useMediaPicker } from "react-dmedia-manager";


export const MyPickerMediaComp = ({ web3 }) => {
  const { mediaPicker } = useMediaPicker({
    web3,
    apiUrl: 'https://dmedia-manager.strandgeek.com/api/v1',
    projectId: 'YOUR PROJECT ID',
  });
  return (
    <div>
      <button
        type="button"
        onClick={() => mediaPicker.open()}
      >
        Select Media...
      </button>
      <MediaPicker mediaPicker={mediaPicker} />
      <div>
        Selected Media: {mediaPicker.ipfsCID}
      </div>
    </div>
  )
}
```


### MediaPicker component

| Prop      | Description                                                                                |
|-----------|--------------------------------------------------------------------------------------------|
| web3      | Web3 instanced used in your dApp. It'll be used to request a signature for authentication. |
| apiUrl    | dMedia Manager API URL                                                                     |
| projectId | Your project ID from dMedia Manager                                                        |
