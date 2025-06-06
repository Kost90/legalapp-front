'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex-1 h-300 w-full flex-center text-center">
      <div>
        <div className="text-title-display">Error</div>
        <div className="text-body-large">{error.message}</div>
      </div>
    </div>
  );
}
