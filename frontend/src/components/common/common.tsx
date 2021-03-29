import React, { useEffect, useState } from 'react';
import styles from './common.module.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 버튼

type ButtonProps = {
  content: string,
  value?: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  buttonColor: string, 
}

export const ButtonLarge = ({ content, value, onClick, buttonColor }: ButtonProps) => {
  return <button
    className={`${styles['btn-large']} ${styles[`${buttonColor}`]}`}
    value={value}
    onClick={onClick}>{content}</button>;
}

export const ButtonMedium = ({ content, value, onClick, buttonColor }: ButtonProps) => {
  return <button
    className={`${styles['btn-medium']} ${styles[`${buttonColor}`]}`}
    value={value}
    onClick={onClick}>{content}</button>;
}

export const ButtonSmall = ({ content, value, onClick, buttonColor }: ButtonProps) => {
  return <button
    className={`${styles['btn-small']} ${styles[`${buttonColor}`]}`}
    value={value}
    onClick={onClick}>{content}</button>;
}

// 이미지 

type ImageProps = {
  src: string,
  alt: string,
}

export const ImageLarge = ({ src, alt }: ImageProps) => {
  return <img
    className={styles['img-large']}
    src={src} alt={alt} />;
}

export const ImageMedium = ({ src, alt }: ImageProps) => {
  return <img
    className={styles['img-medium']}
    src={src} alt={alt} />;
}

export const ImageSmall = ({ src, alt }: ImageProps) => {
  return <img
    className={styles['img-small']}
    src={src} alt={alt} />;
}

export const ImageXsmall = ({ src, alt }: ImageProps) => {
  return <img
    className={styles['img-xsmall']}
    src={src} alt={alt} />;
}

// select

export interface optionType {
  value: string,
  option: string,
}

export interface selectType {
  name: string,
  value?: string,
  options: optionType[],
}

type SelectProps = {
  select: selectType,
  index: number,
  selectValue: string[],
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>)
    => void,
}

export const Select = ({ select, index, selectValue, onChange }: SelectProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if(select) setReady(true);
  },[select]);

  return (
  <>{ ready &&
      <select
        key={index}
        className={styles['search-option']}
        name={select.name}
        value={selectValue[index]}
        onChange={onChange}>
          {select.options.map((option, index) =>
            <option
            key={index}
            value={option.value}>{option.option}</option>)}
      </select>}
  </>
  );
}

// 검색

type SearchProps = {
  selectList: selectType[],
  selectValue: string[],
  inputName: string,
  inputValue: string,
  onSearch: () => void,
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>)
    => void,
  placeholder: string,
  inputSize: string,
}

export const Search = ({ selectList, selectValue, inputName, inputValue, 
                        onSearch, onChange, placeholder, inputSize }: SearchProps) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.key === "Enter") {
      onSearch();
    }
  }

  return (
    <div className={styles['search-container']}>
      { selectList.map((select, index) =>
        <Select 
          key={index}
          select={select} 
          index={index}
          selectValue={selectValue} 
          onChange={onChange}/>)}
      <input 
        className={styles[`${inputSize}`]}
        placeholder={placeholder}
        name={inputName}
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown} />
      <FontAwesomeIcon
        className={styles['search-icon']}
        icon={faSearch}
        onClick={onSearch} />
    </div>);
}


// 모달

type ModalProps = {
  children: any,
}

export const ModalLarge = ({ children }: ModalProps) => {
  return (
  <div className={styles['modal-container']}>
    <div className={styles['modal-large']}>
        {children}
    </div>
  </div>);
}

export const ModalMedium = ({ children }: ModalProps) => {
  return (
  <div className={styles['modal-container']}>
    <div className={styles['modal-medium']}>
        {children}
    </div>
  </div>);
}

export const ModalSmall = ({ children }: ModalProps) => {
  return (
  <div className={styles['modal-container']}>
    <div className={styles['modal-small']}>
        {children}
    </div>
  </div>);
}