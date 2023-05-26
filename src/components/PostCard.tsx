import Link from 'next/link';

interface Props {
  href: string;
  title: string;
  description: string;
}

export function PostCard({ href, title, description }: Props) {
  return (
    <Link
      href={href}
      className="block rounded-md border border-gray-200 bg-gray-0 p-6 pt-5 shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg space-y-2"
    >
      <h3 className="text-lg font-medium leading-snug truncate">{title}</h3>
      <p className="text-sm text-gray-500 line-clamp-3 font-normal">{description}</p>
    </Link>
  );
}
