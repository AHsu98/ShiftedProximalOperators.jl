export ShiftedNormL0BInf

mutable struct ShiftedNormL0BInf{
  R <: Real,
  V0 <: AbstractVector{R},
  V1 <: AbstractVector{R},
  V2 <: AbstractVector{R},
} <: ShiftedProximableFunction
  h::NormL0{R}
  x0::V0
  x::V1
  s::V2
  Δ::R
  χ::Conjugate{IndBallL1{R}}

  function ShiftedNormL0BInf(
    h::NormL0{R},
    x0::AbstractVector{R},
    x::AbstractVector{R},
    Δ::R,
    χ::Conjugate{IndBallL1{R}},
  ) where {R <: Real}
    s = similar(x)
    new{R, typeof(x0), typeof(x), typeof(s)}(h, x0, x, s, Δ, χ)
  end
end

(ψ::ShiftedNormL0BInf)(y) = ψ.h(ψ.x0 + ψ.x + y) + IndBallLinf(ψ.Δ)(y)

shifted(h::NormL0{R}, x::AbstractVector{R}, Δ::R, χ::Conjugate{IndBallL1{R}}) where {R <: Real} =
  ShiftedNormL0BInf(h, zero(x), x, Δ, χ)
shifted(
  ψ::ShiftedNormL0BInf{R, V0, V1, V2},
  x::AbstractVector{R},
) where {R <: Real, V0 <: AbstractVector{R}, V1 <: AbstractVector{R}, V2 <: AbstractVector{R}} =
  ShiftedNormL0BInf(ψ.h, ψ.x, x, ψ.Δ, ψ.χ)

fun_name(ψ::ShiftedNormL0BInf) = "shifted L0 pseudo-norm with L∞-norm trust region indicator"
fun_expr(ψ::ShiftedNormL0BInf) = "s ↦ ‖x + s‖₀ + χ({‖s‖∞ ≤ Δ})"
fun_params(ψ::ShiftedNormL0BInf) = "x0 = $(ψ.x0)\n" * " "^14 * "x = $(ψ.x), Δ = $(ψ.Δ)"

function prox(
  ψ::ShiftedNormL0BInf{R, V0, V1, V2},
  q::AbstractVector{R},
  σ::R,
) where {R <: Real, V0 <: AbstractVector{R}, V1 <: AbstractVector{R}, V2 <: AbstractVector{R}}
  c = sqrt(2 * ψ.λ * σ)

  for i ∈ eachindex(q)
    x0px = ψ.x0[i] + ψ.x[i]
    if abs(x0px + q[i]) ≤ c
      ψ.s[i] = min(-min(x0px, ψ.Δ), ψ.Δ)
    else
      ψ.s[i] = min(max(q[i], -ψ.Δ), ψ.Δ)
    end
  end

  return ψ.s
end