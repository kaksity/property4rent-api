export default function mutateOrganizationName(organizationName: string) {
  const mutatedOrganizationName = organizationName.replace(/\s/g, '_').toLowerCase()
  return mutatedOrganizationName
}
