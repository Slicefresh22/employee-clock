import toastr from 'toastr';
import options from './toastrOptions';

const ToastrService = ToastrService || (() => {
    const successToastr = (message) => {
        toastr.options = options().success
        return toastr.success(message)
    }

    const errorToastr = (message) => {
        toastr.options = options().error;
        return toastr.error(message)
    }

    return{
        success: successToastr,
        error: errorToastr,
    }
})();

export default ToastrService;