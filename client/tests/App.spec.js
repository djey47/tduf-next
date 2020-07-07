import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

jest.mock('@/config/tduf-next.client.config.yaml', () => ({
    serverUrl: 'http://localhost:2021',
}));
jest.mock('@/helpers/rest-client');
const restClientMock = require('@/helpers/rest-client');

describe('App component', () => {
    let wrapper;

    beforeEach(() => {
        restClientMock.get.mockReset();
        wrapper = shallowMount(App);
    });

    afterEach(() => {
        wrapper.destroy();
    })

    it('should render correctly', () => {
        // then
        expect(wrapper.element).toMatchSnapshot();
    });    
    
    it('should fetch config at mount', () => {
        // then
        expect(restClientMock.get).toHaveBeenCalled();
        expect(restClientMock.get.mock.calls[0][0]).toEqual('http://localhost:2021/configuration');
        expect(restClientMock.get.mock.calls[0][1]).toBe(wrapper.vm.mergeConfig);
    });

    describe('mergeConfig method', () => {
        it('should merge server and client configuration', () => {
            // given
            const serverData = {
                foo: 'bar',
                gui: {
                    foo: 'bar',
                },
            };            
            const { vm: { mergeConfig } } = wrapper;
            // when
            mergeConfig(serverData);
            // then
            const actualConfig = wrapper.vm.$data.conf;
            expect(actualConfig).toEqual({
                foo: 'bar',
                gui: {
                    foo: 'bar',
                    serverUrl: 'http://localhost:2021',
                },                
            });
        });
    });
});
