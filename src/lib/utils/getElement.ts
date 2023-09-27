export const selectors = {
  lang: '#lang_list>li',
  englishText: 'ENGLISH',
  englishLink: 'a',

  year: '#slt_y01',
  month: '#slt_m01',
  day: '#slt_d01',
  hour: '#slt_h01',
  from: '[name="txtGoStart"]',
  to: '[name="txtGoEnd"]',
  trainType: '#selTrain',
  trainOptions: '#selTrain>option',

  submit: '.m_conbtn01>li>a',

  trainTable: '.add_conbox01 tbody',
  train: '[src="/img/foreign/en/common/btn_slt01_on.gif"]',

  genderMr: '#ipt_grb01',
  genderMme: '#ipt_grb02',
  firstName: '[name="txtCustFirstNm"]',
  lastName: '[name="txtCustLastNm"]',
  password: '[name="txtCustPw"]',
  password2: '[name="txtCustPw2"]',
  email: '[name="txtEmailAddr"]',
  country: '[name="selNationCd"]',
  countryOptions: '[name="selNationCd"]>option',
  checkAgree: '[name="chkAgree"]',

  submit2: '.btn_a0101>a',

  overseasCB: '#ipt_rdpi01',
  koreanCB: '#ipt_rdpi02',

  submit3: '.btn_a0101>a',
};

export function getElement(selector: string, element?: HTMLElement) {
  if (element) return element.querySelector(selector) as HTMLInputElement;
  return document.querySelector(selector) as HTMLInputElement;
}

export function getAllElement(selector: string) {
  return Array.from(document.querySelectorAll(selector));
}
