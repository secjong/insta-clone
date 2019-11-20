import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, Button, Picker, TouchableHighlight, KeyboardAvoidingView, Alert } from 'react-native';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'

// 사용자정의모듈
import { JOIN_PAGE_JOIN } from "../queries";
import { mapStateToProps, mapDispatchToProps } from "../redux/actions/postAction";
import utils from "../commons/utils";
import styles from '../commons/styles';

/**
 * 회원가입 컴포넌트
 * @method
 */
const Join = (props) => {
  const [ id, setId ] = useState(""); // 아이디
  const [ password, setPassword ] = useState(""); // 비밀번호
  const [ password2, setPassword2 ] = useState(""); // 비밀번호확인
  const [ name, setName ] = useState(""); // 이름
  const [ birth, setBirth ] = useState(""); // 생년월일
  const [ gender, setGender ] = useState(""); // 성별
  const [ site, setSite ] = useState(""); // 사이트
  const [ introduction, setIntroduction ] = useState(""); // 소개글

  const [join, { data, loading, error, called }] = useMutation(JOIN_PAGE_JOIN, {onCompleted: (data) => {onJoinComplete(data);}});
  // const [join, { data, loading, error, called }] = useMutation(JOIN_PAGE_JOIN);

  let idElem = null; // 아이디입력란
  let passwordElem = null; // 패스워드입력란
  let passwordElem2 = null; // 패스워드입력란2
  let nameElem = null; // 이름입력란
  let birthElem = null; // 생년월일입력란
  let siteElem = null; // 사이트입력란
  let introductionElem = null; // 소개글입력란

  useEffect(() => {
    console.log("Join 마운트!");
    return () => {
      console.log("Join 컴포넌트 언마운트");
    };
  });

  const onJoinComplete = (data) => {
    if(data && data.insertMember){
      // 성공인 경우
      Alert.alert("회원가입에 성공", "로그인페이지로 이동합니다.", 
        [
          {text: "네", onPress: () => {props.navigation.navigate("Login");}}
        ], 
        {
          onDismiss: () => {props.navigation.navigate("Login");}
        }
      );
    } else if (data && !data.insertMember) {
      // 실패인 경우
      Alert.alert(
        "회원가입 실패", 
        "중복된 아이디입니다.", 
        [
          {text: "네"}
        ]
      );
    }
  }

  // 입력값 유효성검사
  const checkValidData = () => {
    // 아이디 체크
    if(!utils.isId(id)){
      Alert.alert("", "아이디 영문자로 시작하는 6~20자 영문자 또는 숫자", [{text: "네"}]);
      idElem.focus();
      return false;
      // Alert.alert('제목', '아이디를 입력하세요.', [
      //   {text: '아니오', onPress: () => console.log('아니오 클릭!')},
      //   {text: '네', onPress: () => console.log('네 클릭!')},
      // ], {
      //   // cancelable: false,
      //   onDismiss: () => {
      //     console.log('취소됨...');
      //     idElem.focus();
      //   }
      // }
      // );
    }
    // 비밀번호 체크
    if(!utils.isPassword(password)){
      Alert.alert("", "비밀번호 최소 8 자 및 최대 50 자, 대문자 하나 이상, 소문자 하나 이상, 숫자 하나 이상, 특수 문자 하나 이상", [{text: "네"}]);
      passwordElem.focus();
      return false;
    }
    // 비밀번호2 체크
    if(password !== password2){
      Alert.alert("", "비밀번호가 일치하지 않습니다.", [{text: "네"}]);
      passwordElem2.focus();
      return false;
    }
    // 이름 체크
    if(utils.isEmpty(name)){
      Alert.alert("", "이름을 입력하세요.", [{text: "네"}]);
      nameElem.focus();
      return false;
    }
    // 사이트주소 체크(입력된 경우에만)
    if(!utils.isEmpty(site)){
      // 도메인형식 체크
      if(!utils.isDomain(site, "1")){
        Alert.alert("", "사이트 주소가 올바르지 않습니다.", [{text: "네"}]);
        siteElem.focus();
        return false;
      }
    }
    return true;
  }

  // 회원가입 진행
  const triggerJoin = () => {
    let isValid = checkValidData();
    if(!isValid){
      return false;
    }
    const data = {
      id, password, name, birth, gender, site, introduction
    }
    join({ variables: data });
  }

  // 생년월일 선택 범위는 오늘 날짜로부터 100년 전 날짜 ~ 오늘 날짜로 한다.
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Image style={styles.image} source={require("../../assets/images/insta_logo.png")} />

      <View style={styles.marginTop30}>
        <Text style={styles.fontSize20}>친구들의 사진과 동영상을 보려면 가입하세요.</Text>
      </View>

      <TextInput style={styles.textInputWide} value={id} placeholder="아이디(필수)" onChangeText={setId} autoCapitalize={"none"} ref={(elem) => {idElem = elem}}></TextInput>
      <TextInput style={styles.textInputWide} value={password} placeholder="비밀번호(필수)" onChangeText={setPassword} secureTextEntry={true} textContentType="password" autoCapitalize={"none"} ref={(elem) => {passwordElem = elem}}></TextInput>
      <TextInput style={styles.textInputWide} value={password2} placeholder="비밀번호확인(필수)" onChangeText={setPassword2} secureTextEntry={true} textContentType="newPassword" autoCapitalize={"none"} ref={(elem) => {passwordElem2 = elem}}></TextInput>
      <TextInput style={styles.textInputWide} value={name} placeholder="성명(필수)" onChangeText={setName} ref={(elem) => {nameElem = elem}}></TextInput>

      <DatePicker
        style={styles.textInputWide}
        date={birth}
        mode="date"
        placeholder="생년월일"
        format="YYYYMMDD"
        minDate={utils.getPastDate({y: -100})}
        maxDate={utils.getPastDate()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderWidth: 0
          }
        }}
        onDateChange={(date) => {setBirth(date)}}
      />

      <Picker
        selectedValue={gender}
        style={styles.textInputWide}
        onValueChange={(itemValue, itemIndex) =>
          setGender(itemValue)
      }>
        <Picker.Item label="성별선택" value="" />
        <Picker.Item label="남성" value="M" />
        <Picker.Item label="여성" value="F" />
      </Picker>

      <TextInput style={styles.textInputWide} value={site} placeholder="사이트주소" onChangeText={setSite} textContentType="URL" autoCapitalize={"none"} ref={(elem) => {siteElem = elem}}></TextInput>
      <TextInput style={styles.textInputWide} value={introduction} placeholder="자기소개" onChangeText={setIntroduction} multiline = {true} numberOfLines = {10}></TextInput>

      <TouchableHighlight style={styles.button}>
          <Button title="가입" onPress={triggerJoin} />
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );

}
export default connect(mapStateToProps, mapDispatchToProps)(Join);