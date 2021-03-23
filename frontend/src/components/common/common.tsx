import React from 'react';
import styles from './common.module.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = {
  value: string,
  onClick: () => void
  buttonColor: string, 
}

export const ButtonLarge = ({ value, onClick, buttonColor }: ButtonProps) => {
  return <button
    className={`${styles['btn-large']} ${styles[`${buttonColor}`]}`}
    onClick={onClick}>{value}</button>;
}

export const ButtonMedium = ({ value, onClick, buttonColor }: ButtonProps) => {
  return <button
    className={`${styles['btn-medium']} ${styles[`${buttonColor}`]}`}
    onClick={onClick}>{value}</button>;
}

export const ButtonSmall = ({ value, onClick, buttonColor }: ButtonProps) => {
  return <button
    className={`${styles['btn-small']} ${styles[`${buttonColor}`]}`}
    onClick={onClick}>{value}</button>;
}

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

interface optionType {
  value: string,
  option: string,
}

interface selectType {
  name: string,
  value?: string,
  options: optionType[],
}

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

export const Search = ({ selectList, selectValue, inputName, inputValue, onSearch, onChange, placeholder, inputSize }: SearchProps) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.key === "Enter") {
      onSearch();
    }
  }

  return (
    <div className={styles['search-container']}>
      { selectList.map((select, index) =>
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
        </select>
      )}
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