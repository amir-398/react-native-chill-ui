/**
 * Get user initials from firstname and lastname
 *
 * @param data - User data containing firstname and lastname
 * @returns Formatted initials string
 *
 * @example
 * ```tsx
 * getUserInitials({ firstname: 'John', lastname: 'Doe' }) // Returns 'JD'
 * getUserInitials({ firstname: 'John' }) // Returns 'J'
 * getUserInitials({}) // Returns ''
 * ```
 */
function getUserInitials(data: { firstname?: string; lastname?: string }) {
  if (!data?.firstname) return data.lastname?.charAt(0).toUpperCase();
  if (!data?.lastname) return data.firstname.charAt(0).toUpperCase();
  const firstInitial = data.firstname.charAt(0).toUpperCase();
  const lastInitial = data.lastname.charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

export default getUserInitials;
