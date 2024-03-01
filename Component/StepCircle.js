import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const StepCircle = ({ label, isActive, isCompleted }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;

    if (isActive) {
      rotation.setValue(0);
      animation = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isActive, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.stepItem}>
      <LinearGradient
        colors={[isCompleted ? '#52c7fe' : isActive ? '#52c7fe' : '#d9d9d9', isCompleted ? '#3566d8' : isActive ? '#3566d8' : '#9f9f9f']}
        style={[styles.circle, isCompleted && styles.completedCircle]}
      >
        <LinearGradient
          colors={[isCompleted ? '#52c7fe' : isActive ? '#52c7fe' : '#d9d9d9', isCompleted ? '#3566d8' : isActive ? '#3566d8' : '#9f9f9f']}
          style={[styles.innerCircle, isActive && styles.activeInnerCircle]}
        >
        {isCompleted && <Icon name="check" size={20} color="#ffffff" />}

          {isActive && (
            <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]}>
              <View style={styles.loaderTip} />
            </Animated.View>
          )}
        </LinearGradient>
      </LinearGradient>
      <Text style={[styles.stepLabel, isActive && styles.activeStepLabel]}>{label}</Text>
    </View>
  );
};

const StepLine = ({ isWide, isActive, isCompleted }) => {
  return (
    <View style={[styles.lineContainer, isWide && styles.wideLine]}>
      <LinearGradient
        colors={[isCompleted ? '#52c7fe' : isActive ? '#52c7fe' : '#d9d9d9', isCompleted ? '#3566d8' : isActive ? '#3566d8' : '#9f9f9f']}
        style={[styles.gradient, isWide && styles.wideLineGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};

const Stepper = ({ steps, activeStep }) => {
  return (
    <View style={styles.container}>
      <StepLine isWide={false} isActive={true} />
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <StepLine isWide={index === 1 || index === 2} isActive={index <= activeStep + 1} isCompleted={index + 2 <= activeStep} />}
          <StepCircle
            label={step.label}
            isActive={index === activeStep}
            isCompleted={index < activeStep}
          />
        </React.Fragment>
      ))}
      <StepLine isWide={false} isActive={activeStep === 2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepItem: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0px 6px 6px rgba(1,163,153,0.3))',
  },
  innerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeInnerCircle: {
    borderWidth: 0,
  },
  completedCircle: {
    borderWidth: 0,
  },
  loader: {
    position: 'relative',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#52c7fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderTip: {
    position: 'absolute',
    top: -5,
    left: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
  },
  stepLabel: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
  },
  activeStepLabel: {
    color: 'green',
  },
  lineContainer: {
    height: 8,
    flex: 1,
    marginBottom: 25,
  },
  gradient: {
    flex: 1,
    borderRadius: 8,
  },
  wideLine: {
    width: 10,
  },
  wideLineGradient: {
    width: 40,
  },
});

export default Stepper;
