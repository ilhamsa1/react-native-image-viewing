/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect } from "react";
import {
  BackHandler,
  View,
  StyleSheet,
  StatusBar,
  ModalProps
} from "react-native";

type Props = ModalProps & {
  children: JSX.Element;
};

const Modal = ({
  visible,
  children,
  presentationStyle,
  onRequestClose
}: Props) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (typeof onRequestClose === "function") {
          onRequestClose();
        }

        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  if (!visible) {
    return null;
  }

  const statusBarHidden = presentationStyle === "overFullScreen";

  return (
    <>
      {statusBarHidden && <StatusBar hidden />}
      <View style={styles.root}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    backgroundColor: "transparent"
  },
  overFullscreen: {
    top: 0
  },
});

export default Modal;
