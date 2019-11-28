import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Constants } from "expo";
import WebViewQuillEditor from "./WebviewQuillJS/WebViewQuillEditor";
import WebViewQuillViewer from "./WebviewQuillJS/WebViewQuillViewer";

// example content to display
/* const contentToDisplay = {
  ops: [{ insert: 'Hello\n' }, { insert: 'This is another line' }]
}; */

interface Props{

}

interface State{
  editorMessageDelta: any[],
  viewerMessageDelta: any[]
}

export default class App extends React.Component<null, State> {
  webViewQuillEditor: WebViewQuillEditor;
  webViewQuillViewer: any;
  constructor(props) {
    super(props);
    this.state = {
      editorMessageDelta: [
        { insert: "Hello World" },
        { insert: "!", attributes: { bold: true } }
      ],
      viewerMessageDelta: [
        { insert: "Gandalf", attributes: { bold: true } },
        { insert: " the " },
        { insert: "Grey", attributes: { color: "#ccc" } }
      ]
    };
  }

  getEditorDelta = () => {
    this.webViewQuillEditor.getDelta();
  };

  getDeltaCallback = response => {
    console.log("getDeltaCallback");
    console.log(response.delta);
    this.webViewQuillViewer.sendContentToViewer(response.delta);
  };

  onDeltaChangeCallback = (delta, deltaChange, deltaOld, changeSource) => {
    console.log(
      "onDeltaChangeCallback: ",
      { delta },
      { deltaChange },
      { deltaOld },
      changeSource
    );
  };

  render() {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "#e2e2e2"
        }}
      >
        <View style={styles.statusBar} />
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontSize: 20,
            backgroundColor: "#9be1ff",
            color: "black"
          }}
        >
          React Native Webview Quill-js Demo .02
        </Text>
        <View
          style={{
            flex: 1,
            padding: 5,
            backgroundColor: "rgba(100, 100, 255, 1)"
          }}
        >
          <WebViewQuillEditor
            backgroundColor={"#fffbea"}
            contentToDisplay={this.state.editorMessageDelta}
            getDeltaCallback={this.getDeltaCallback}
            onDeltaChangeCallback={this.onDeltaChangeCallback}
            ref={component => (this.webViewQuillEditor = component)}
          />
        </View>
        <View
          style={{
            margin: 5
          }}
        >
          <Button
            onPress={this.getEditorDelta}
            title="Get Text"
            color="#4286f4"
            accessibilityLabel="Click this button to copy text from the editor to the viewer"
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 5,
            backgroundColor: "rgba(255, 255, 100, 1)"
          }}
        >
         {/*  <WebViewQuillViewer
            ref={component => (this.webViewQuillViewer = component)}
            contentToDisplay={this.state.viewerMessageDelta}
            backgroundColor={"#fffbea"}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ccccff",
    display: "flex"
  },
  statusBar: {
    height: 48,
    backgroundColor: "#9be1ff"
  }
});
