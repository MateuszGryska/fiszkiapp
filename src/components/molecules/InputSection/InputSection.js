import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from 'components/atoms/Input/Input';
import Message from 'components/atoms/Message/Message';
import { useTranslation } from 'react-i18next';

const StyledInput = styled(Input)`
  margin-top: 10px;
  width: 360px;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const StyledInputSection = styled.div`
  margin: 0;
  padding: 0;
  border: none;
`;

const StyledLabel = styled.label`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const StyledTextArea = styled(Input)`
  margin-top: 10px;
  height: 30vh;
  min-height: 10vh;
  min-width: 360px;
  max-width: 360px;

  @media (max-width: 480px) {
    min-width: 200px;
    width: 90vw;
  }
`;

const StyledMessage = styled(Message)`
  margin-top: 0px;
  padding-left: 20px;
  margin-bottom: 5px;
`;

const InputSection = ({
  type,
  name,
  placeholder,
  label,
  onChange,
  onBlur,
  value,
  error,
  touched,
  ariaDescribedBy,
  as,
}) => {
  const { t } = useTranslation();
  return (
    <StyledInputSection role="group">
      <StyledLabel id={name}>{t(label)}</StyledLabel>
      {as === 'textarea' ? (
        <StyledTextArea
          autoComplete="off"
          type={type}
          name={name}
          placeholder={t(placeholder)}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          as={as}
          aria-invalid="true"
          aria-describedby={ariaDescribedBy}
          aria-labelledby={name}
        />
      ) : (
        <StyledInput
          autoComplete="off"
          type={type}
          name={name}
          placeholder={t(placeholder)}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          as={as}
          aria-invalid="true"
          aria-describedby={ariaDescribedBy}
          aria-labelledby={name}
        />
      )}
      {error && touched ? (
        <StyledMessage id={ariaDescribedBy} error>
          {t(error)}
        </StyledMessage>
      ) : (
        <StyledMessage />
      )}
    </StyledInputSection>
  );
};

InputSection.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  ariaDescribedBy: PropTypes.string.isRequired,
  as: PropTypes.string,
};

InputSection.defaultProps = {
  as: null,
  touched: false,
  error: null,
};
export default InputSection;
