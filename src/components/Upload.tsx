import { ChangeEvent, useRef, ReactNode } from 'react';

type Props = {
  onUrl?: (url: string) => void;
  onError?: (error: string) => void;
  children?: ReactNode;
};

const Upload = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      const formData = new FormData();
      formData.append('fileToUpload', files[0]);

      fetch('https://nostr.build/api/upload/iris.php', {
        method: 'POST',
        body: formData,
      })
        .then(async (response) => {
          const url = await response.json();
          if (url && props.onUrl) {
            props.onUrl(url);
          }
        })
        .catch((error) => {
          console.error('upload error', error);
          props.onError?.('upload failed: ' + JSON.stringify(error));
        });
    }
  };

  return (
    <div className="inline-block" onClick={handleClick}>
      {props.children ? (
        props.children
      ) : (
        <button className="btn btn-primary" onClick={(e) => e.preventDefault()}>
          Upload
        </button>
      )}
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default Upload;
