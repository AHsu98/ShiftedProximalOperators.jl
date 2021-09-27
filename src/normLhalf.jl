# Lhalf pseudo-norm (times a constant)

export RootNormLhalf

"""
**``L_1/2^(1/2)`` pseudo-norm**
    RootNormLhalf(λ=1)
Returns the function
```math
f(x) = λ\\cdot \\sum |x|\\^{1/2}
```
for a nonnegative parameter `λ`.
"""
struct RootNormLhalf{R <: Real} <: ProximableFunction
  lambda::R
  function RootNormLhalf{R}(lambda::R) where {R <: Real}
    if lambda < 0
      error("parameter λ must be nonnegative")
    else
      new(lambda)
    end
  end
end

RootNormLhalf(lambda::R=1) where {R <: Real} = RootNormLhalf{R}(lambda)

function (f::RootNormLhalf)(x::AbstractArray{T}) where {T <: Real}
  return f.lambda * T(sum(sqrt.(abs.(x))))
end

function prox!(y::AbstractArray{T}, f::RootNormLhalf, x::AbstractArray{T}, gamma::Real=1) where {T <: Real}
  γλ = 2 * gamma * f.lambda
  ϕ(z) = acos(γλ / 8 * (abs(z) /3 )^(-3/2))
  for i in eachindex(x)
    if abs(x[i]) <= 54^(1/3) * (γλ^(2/3)) / 4
      y[i] = 0
    else
      y[i] = 2 * sign(x[i]) / 3 * abs(x[i]) * (1 + cos(2 * π / 3 - 2 * ϕ(x[i]) / 3))
    end
  end

  return f.lambda * sum(sqrt.(abs.(y)))
end

fun_name(f::RootNormLhalf) = "L_(1/2)^(1/2) pseudo-norm"
fun_dom(f::RootNormLhalf) = "AbstractArray{Real}, AbstractArray{Complex}"
fun_expr(f::RootNormLhalf{T}) where {T <: Real} = "x ↦ (λ/2)||x||^(1/2)_(1/2)"
fun_params(f::RootNormLhalf{T}) where {T <: Real} = "λ = $(f.lambda)"

function prox_naive(f::RootNormLhalf, x::AbstractArray{T}, gamma::Real=1) where {R, T <: Real}
  y = similar(x)
  cost = prox!(y, f, x, gamma)
  return y, cost
end