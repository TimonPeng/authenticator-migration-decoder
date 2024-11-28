import { Card, CardBody, Divider, Input, Snippet, Tab, Tabs } from '@nextui-org/react';
import { useList } from '@uidotdev/usehooks';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { Github } from 'lucide-react';
import { URI } from 'otpauth-migration';
import { useEffect, useState } from 'react';

import { GITHUB_URL, MIGRATION_URI_PREFIX } from '~/constants';

function Header() {
  return (
    <div className='flex h-16 items-center border-b border-divider'>
      <div className='container mx-auto flex items-center justify-between'>
        <h1 className='text-lg font-bold'>Authenticator Migration Decoder</h1>

        <div>
          <a href={GITHUB_URL} target='_blank' rel='noreferrer'>
            <Github className='text-foreground' />
          </a>
        </div>
      </div>
    </div>
  );
}

function MigrationItem({
  uri = '',
  onValueChange,
  readOnly = false,
}: {
  uri: string;
  onValueChange?: (uri: string) => void;
  readOnly?: boolean;
}) {
  const [error, setError] = useState('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!uri) {
      setError('');
      setResults([]);
      return;
    }
    if (!uri.startsWith(MIGRATION_URI_PREFIX)) {
      setError(`URI must start with ${MIGRATION_URI_PREFIX}`);
      setResults([]);
      return;
    }

    try {
      const authUris = URI.toOTPAuthURIs(uri);
      console.log(authUris);

      setError('');
      setResults(authUris);
    } catch (error) {
      console.log(error);

      setError(error instanceof Error ? error.message : 'Invalid OTP Auth URI');
      setResults([]);
    }
  }, [uri]);

  return (
    <Card className='w-full'>
      <CardBody>
        <Input
          label='Migration URI'
          placeholder={`Starts with ${MIGRATION_URI_PREFIX}`}
          value={uri}
          onValueChange={onValueChange}
          isInvalid={!!error}
          errorMessage={error}
          isReadOnly={readOnly}
          isClearable
        />

        {results.length > 0 && (
          <>
            <Divider className='mb-2 mt-6' />
            <h1 className='text-lg font-bold'>{results.length} results:</h1>

            <div className='mt-2 flex flex-col gap-2'>
              {results.map((uri, index) => (
                <OtpAuth key={index} uri={uri} />
              ))}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}

function OtpAuth({ uri }: { uri: string }) {
  return (
    <Snippet symbol='' variant='bordered'>
      {uri}
    </Snippet>
  );
}

function App() {
  const [migrationsUris, { set, updateAt }] = useList<string>(['']);

  const onScan = (results: IDetectedBarcode[]) => {
    console.log(results);

    const uris = results.map((result) => result.rawValue).filter((uri) => uri.startsWith(MIGRATION_URI_PREFIX));
    set(uris);
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />

      <div className='container mx-auto flex-1 py-4'>
        <div className='flex flex-col items-center gap-4'>
          <Tabs classNames={{ panel: 'p-0' }}>
            <Tab key='text' title='Text Input' />
            <Tab key='camera' title='Camera Scan'>
              <div className='h-72 w-72 overflow-hidden rounded-xl'>
                <Scanner formats={['qr_code']} onScan={onScan} />
              </div>
            </Tab>
            {/* <Tab key='image' title='Image Upload'></Tab> */}
          </Tabs>

          {migrationsUris.map((uri, index) => (
            <MigrationItem key={index} uri={uri} onValueChange={(uri) => updateAt(index, uri)} readOnly={index !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
