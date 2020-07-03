
const gatewayMock = require('./gateway/tduf-legacy'); 
const { bankinfo } = require('./file');

jest.mock('./gateway/tduf-legacy');

describe('file operations', () => {
    beforeEach(() => {
        gatewayMock.invoke.mockReset();
    });

    describe('bankinfo operation', () => {
        it('should invoke gateway with right parameters', () => {
            // given
            const args = {
                input: './input.file.bnk',
            };

            // when
            bankinfo(args);

            // then
            expect(gatewayMock.invoke).toHaveBeenCalledWith('FileTool', 'bankinfo -i ./input.file.bnk -n');
        });
    }); 
});
