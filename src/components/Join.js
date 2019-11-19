import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, Button, Picker, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
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

  const [join, { loading, error }] = useMutation(JOIN_PAGE_JOIN);

  useEffect(() => {
    console.log("Join 마운트!");
    return () => {
      console.log("Join 컴포넌트 언마운트");
    };
  });

  // 입력값 유효성검사
  const checkValidData = () => {
    // 필수값검사
    // 이메일 등 형식검사
  }

  // 회원가입 진행
  const triggerJoin = () => {
    const data = {
      id, password, name, birth, gender, site, introduction
    }
    join({ variables: data });
    // 회원가입 결과처리
  }

  // 생년월일 선택 범위는 오늘 날짜로부터 100년 전 날짜 ~ 오늘 날짜로 한다.
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Image style={styles.image} source={require("../../assets/images/insta_logo.png")} />

      <View style={styles.marginTop30}>
        <Text style={styles.fontSize20}>친구들의 사진과 동영상을 보려면 가입하세요.</Text>
      </View>

      <TextInput style={styles.textInputWide} value={id} placeholder="아이디(필수)" onChangeText={setId} autoFocus={true}></TextInput>
      <TextInput style={styles.textInputWide} value={password} placeholder="비밀번호(필수)" onChangeText={setPassword} secureTextEntry={true} textContentType="password"></TextInput>
      <TextInput style={styles.textInputWide} value={password2} placeholder="비밀번호확인(필수)" onChangeText={setPassword2} secureTextEntry={true} textContentType="newPassword"></TextInput>
      <TextInput style={styles.textInputWide} value={name} placeholder="성명(필수)" onChangeText={setName}></TextInput>

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

      <TextInput style={styles.textInputWide} value={site} placeholder="사이트주소" onChangeText={setSite} textContentType="URL"></TextInput>
      <TextInput style={styles.textInputWide} value={introduction} placeholder="자기소개" onChangeText={setIntroduction} multiline = {true} numberOfLines = {10}></TextInput>

      <TouchableHighlight style={styles.button}>
          <Button title="가입" onPress={triggerJoin} />
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );

}
export default connect(mapStateToProps, mapDispatchToProps)(Join);