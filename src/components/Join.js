import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, Button, Picker, TouchableHighlight } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'

// 사용자정의모듈
import { HOME_PAGE } from "../queries";
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

  useEffect(() => {
    console.log("Join 마운트!");
    return () => {
      console.log("Join 컴포넌트 언마운트");
    };
  });

  // 생년월일 선택 범위는 오늘 날짜로부터 100년 전 날짜 ~ 오늘 날짜로 한다.
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/insta_logo.png")} />

      <View style={styles.marginTop30}>
        <Text style={styles.fontSize20}>친구들의 사진과 동영상을 보려면 가입하세요.</Text>
      </View>

      <TextInput style={styles.textInputWide} value={id} placeholder="아이디" onChangeText={setId}></TextInput>
      <TextInput style={styles.textInputWide} value={password} placeholder="비밀번호" onChangeText={setPassword} secureTextEntry={true}></TextInput>
      <TextInput style={styles.textInputWide} value={password2} placeholder="비밀번호확인" onChangeText={setPassword2} secureTextEntry={true}></TextInput>
      <TextInput style={styles.textInputWide} value={name} placeholder="성명" onChangeText={setName}></TextInput>

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
      
      <TextInput style={styles.textInputWide} value={gender} placeholder="성별" onChangeText={setGender}></TextInput>
      <TextInput style={styles.textInputWide} value={site} placeholder="사이트주소" onChangeText={setSite}></TextInput>
      <TextInput style={styles.textInputWide} value={introduction} placeholder="자기소개" onChangeText={setIntroduction}></TextInput>

      <TouchableHighlight style={styles.button}>
          <Button title="가입" onPress={() => {}} />
      </TouchableHighlight>
    </View>
  );

}
export default connect(mapStateToProps, mapDispatchToProps)(Join);