const PREFIX = 'lens.dev/dm'
const buildConversationId = (profileIdA: string, profileIdB: string) => {
  const profileIdAParsed = parseInt(profileIdA, 16);
  console.log('this is 1', profileIdAParsed);
  
  const profileIdBParsed = parseInt(profileIdB, 16);
  console.log('this is 2', profileIdBParsed);

  return profileIdAParsed < profileIdBParsed
    ? `${PREFIX}/${profileIdA}-${profileIdB}`
    : `${PREFIX}/${profileIdB}-${profileIdA}`
}
export default buildConversationId;