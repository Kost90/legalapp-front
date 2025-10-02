'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex-center h-300 w-full flex-1 text-center">
      <div>
        <div className="text-title-display">Error</div>
        <div className="text-body-large">{error.message}</div>
      </div>
    </div>
  );
}
