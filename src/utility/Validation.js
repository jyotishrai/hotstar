import flashMessage from "../components/common/CustomFlashAlert";
import Strings from '../translation/language'

export function IsMobileNumber(txtMobId) {
    var mob = /^[1-9]{1}[0-9]{9}$/;
    if (txtMobId.props.value === "") {
        flashMessage("Mobile number must not be blank.", "danger");
        return false;
    } else if (mob.test(txtMobId.props.value) == false) {
        flashMessage("Please enter valid mobile number.", "danger");
        txtMobId.focus();
        return false;
    }
    return true;
}

export function IsPassowrd(txtPassId) {
    if (txtPassId.props.value === "") {
        flashMessage("Password must not be blank.", "danger");
        return false;
    }
    return true;
}

export function validateRegisterFormFirst(form) {
    if (form.isCompany && form.companyName == '') {
        flashMessage(Strings.please_enter_company_name, 'danger')
        return false;
    }
    else if (form.isCompany && form.companyRegNo == '') {
        flashMessage(Strings.please_enter_registration_number, 'danger')
        return false;
    }
    else if (form.isCompany && form.establishedOn == '') {
        flashMessage(Strings.please_select_establishment_date, 'danger')
        return false;
    }
    else if (form.isIndividual && form.individualName == '') {
        flashMessage(Strings.please_enter_name, 'danger')
        return false;
    }
    else if (form.isIndividual && form.IDND == '') {
        flashMessage(Strings.please_enter_IDND, 'danger')
        return false;
    }
    else if (form.isIndividual && form.experience == '') {
        flashMessage(Strings.please_enter_your_experince, 'danger')
        return false;
    }
    else if (form.selectedCompanyType == '') {
        flashMessage(Strings.please_select_company_type, 'danger')
        return false;
    }
    else if (form.location == '') {
        flashMessage(Strings.please_select_company_location, 'danger')
        return false;
    }
    else if (form.address1 == '') {
        flashMessage(Strings.please_enter_address, 'danger')
        return false;
    }
    else if (form.selectedCountry == '') {
        flashMessage(Strings.please_select_country, 'danger')
        return false;
    }
    else if (form.selectedState == '') {
        flashMessage(Strings.please_select_state, 'danger')
        return false;
    }
    else if (form.selectedCity == '') {
        flashMessage(Strings.please_select_city, 'danger')
        return false;
    }
    else if (form.pincode == '') {
        flashMessage(Strings.please_enter_pincode, 'danger')
        return false;
    }
    else {
        return true;
    }
}

export function validateLogin(form) {
    if (form.email == '') {
        flashMessage(Strings.please_enter_email, 'danger')
        return false;
    }else if (form.password === "") {
        flashMessage("Password must not be blank.", "danger");
        return false;
    }
    return true;
}

export function validateRegisterFormSecond(form) {
    if (form.selectedDealsIn == '') {
        flashMessage(Strings.please_select_deals_in, 'danger')
        return false;
    }
    else if (form.contactPersonName == '') {
        flashMessage(Strings.please_enter_contact_person_name, 'danger')
        return false;
    }
    else if (form.mobileNumber == '') {
        flashMessage(Strings.please_enter_mobile_number, 'danger')
        return false;
    }
    else if (form.email == '') {
        flashMessage(Strings.please_enter_email, 'danger')
        return false;
    }
    else if (form.dob == '') {
        flashMessage(Strings.please_select_dob, 'danger')
        return false;
    }
    else if (form.gender == '') {
        flashMessage(Strings.please_select_gender, 'danger')
        return false;
    }
    else if (form.password == '') {
        flashMessage(Strings.please_enter_password, 'danger')
        return false;
    }
    else if (form.cPassword == '') {
        flashMessage(Strings.please_re_enter_password, 'danger')
        return false;
    }
    else if (form.password != form.cPassword) {
        flashMessage(Strings.password_not_matched, 'danger')
        return false;
    }
    else {
        return true;
    }
}

export function validateBankForm(form) {
    if (form.selectedBank == '') {
        flashMessage(Strings.please_select_bank_account, 'danger')
        return false;
    }
    else if (form.accountNumber == '') {
        flashMessage(Strings.please_enter_bank_account, 'danger')
        return false;
    }
    else if (form.cAccountNumber == '') {
        flashMessage(Strings.please_re_enter_account_number, 'danger')
        return false;
    }
    else if (form.accountNumber != form.cAccountNumber) {
        flashMessage(Strings.account_number_not_matched, 'danger')
        return false;
    }
    else if (form.accountHolderName == '') {
        flashMessage(Strings.please_enter_account_holder_name, 'danger')
        return false;
    }
    else if (form.IFSC == '') {
        flashMessage(Strings.please_enter_ifsc_code, 'danger')
        return false;
    }
    else {
        return true;
    }
}