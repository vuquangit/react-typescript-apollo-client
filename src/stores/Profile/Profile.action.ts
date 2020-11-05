import * as actionTypes from './actionTypes'

const updateProfile = (
  profileData: actionTypes.IProfileData
): actionTypes.ProfileActionTypes => {
  return {
    type: actionTypes.PROFILE_UPDATE,
    payload: profileData,
  }
}

const clearProfile = (): actionTypes.ProfileActionTypes => ({
  type: actionTypes.PROFILE_CLEAR,
})

export { updateProfile, clearProfile }
