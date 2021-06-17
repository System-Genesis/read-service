import { Request, Response } from 'express';
import EntityManager from './entity.manager';

describe('getAll', () => {
    it('should return more than 1 entity', async () => {
        // const mReq = { body: {} } as Request;
        // const mRes = {};
        // const mNext = jest.fn();
        const entities = await EntityManager.getAll();
        expect(Array.isArray(entities)).toBeTruthy();
    });

    //     it('should throw 400 error if id is undefined', async () => {
    //         const mReq = { params: {} };
    //         const mRes = {};
    //         const mNext = jest.fn();
    //         await retrieveMember(mReq, mRes, mNext);
    //         expect(mNext).toBeCalledWith(new Error('invalid.'));
    //     });

    //     it('should throw 400 error if id is invalid format', async () => {
    //         const mReq = { params: { id: '$$' } };
    //         const mRes = {};
    //         const mNext = jest.fn();
    //         await retrieveMember(mReq, mRes, mNext);
    //         expect(mNext).toBeCalledWith(new Error('invalid format.'));
    //     });

    //     it('should retrieve one member by id and send response correctly', async () => {
    //         const mMemberRecord = { id: '1', username: 'KF1' };
    //         jest.spyOn(MemberService, 'retrieveOneMember').mockResolvedValueOnce(mMemberRecord);
    //         const mReq = { params: { id: '1' } };
    //         const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    //         const mNext = jest.fn();
    //         await retrieveMember(mReq, mRes, mNext);
    //         expect(MemberService.retrieveOneMember).toBeCalledWith('1');
    //         expect(mRes.status).toBeCalledWith(200);
    //         expect(mRes.send).toBeCalledWith({ member_detail: { id: '1', username: 'KF1' } });
    //     });
});
