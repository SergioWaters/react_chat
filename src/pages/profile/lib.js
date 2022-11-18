export const profileForm = (profile) => {
  return [
    {
      attr: 'email',
      value: profile.email,
      label: 'email'
    },
    {
      attr: 'displayName',
      value: profile.displayName,
      label: 'nickname'
    },
    {
      attr: 'photoURL',
      value: profile.photoURL,
      label: 'link to photo'
    },
    {
      attr: 'phoneNumber',
      value: profile.phoneNumber,
      label: 'phone number'
    }
  ]
}