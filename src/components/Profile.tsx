import Image from 'next/image';

interface Props {
  avartar: string;
  name: string;
  bio?: string;
}

function Profile({ avartar, name, bio }: Props) {
  return (
    <div className="flex flex-row gap-3">
      <Image className="rounded-full w-10 h-10" width={40} height={40} src={avartar} alt="avatar" />
      <div className="flex flex-col justify-center">
        <span className="text-sm font-bold">{name}</span>
        {bio ? <span className="text-xs text-gray-400">{bio}</span> : null}
      </div>
    </div>
  );
}

export default Profile;
