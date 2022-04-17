import { StyleSheet } from 'react-native';

const useStyles = function() {
    return StyleSheet.create({
      listItem: {
        alignItems: 'center',
        backgroundColor: 'rgb(128, 128, 128)',
        borderRadius: 8,
        height: 100,
        justifyContent: 'space-evenly',
      },
      button: {
        alignItems: 'center',
        backgroundColor: 'rgb(93, 95, 222)',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
      },
      buttonTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32,
      },
      forgotPasswordContainer: {
        alignItems: 'flex-end',
      },
      form: {
        alignItems:'flex-start',
        backgroundColor: 'rgb(58, 58, 60)',
        borderRadius: 8,
        flexDirection: 'row',
        height: 48,
        paddingHorizontal: 16,
      },
      textInputForm: {
        alignItems:'flex-start',
        backgroundColor: 'rgb(58, 58, 60)',
        borderRadius: 8,
        flexDirection: 'row',
        height: 100,
        paddingHorizontal: 16,
      },
      label: {
        color: 'rgba(235, 235, 245, 0.6)',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        width: 80,
      },
      root: {
        backgroundColor: '#000000',
        flex: 1,
      },
      safeAreaView: {
        flex: 1,
      },
      subtitle: {
        color: 'rgba(235, 235, 245, 0.6)',
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
      },
      textButton: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
      },
      textInput: {
        color: '#FFFFFF',
        flex: 1,
      },
      title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
      },
    });
  }

export default useStyles;